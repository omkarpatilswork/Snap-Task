import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"
import { config } from "@/lib/config"

const genAI = new GoogleGenerativeAI(config.geminiApiKey)

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Remove data URL prefix if present
    const base64Data = image.replace(/^data:image\/[a-z]+;base64,/, "")

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
    Analyze this screenshot image and extract the following information:

    1. Perform OCR to extract ALL visible text from the image
    2. Categorize the content into ONE of these categories:
       - "job" (job postings, career opportunities, applications)
       - "product" (items to buy, shopping, e-commerce)
       - "place" (locations to visit, events, venues)
       - "food" (restaurants, recipes, food delivery)
       - "person" (contacts, social profiles, people to connect with)
       - "note" (general information, documents, notes)

    3. Extract any URLs found in the text
    4. Create a descriptive title (max 60 characters)
    5. Write a brief description (max 200 characters)
    6. Suggest an appropriate due date (format: YYYY-MM-DD)

    Return ONLY a JSON object with this exact structure:
    {
      "category": "one of the 6 categories above",
      "title": "descriptive title",
      "description": "brief description",
      "url": "extracted URL or empty string if none found",
      "extractedText": "all visible text from the image",
      "suggestedDueDate": "YYYY-MM-DD format or empty string"
    }

    Be accurate with OCR and choose the most appropriate category based on the content.
    `

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg",
      },
    }

    const result = await model.generateContent([prompt, imagePart])
    const response = await result.response
    const text = response.text()

    // Parse the JSON response
    let parsedResponse
    try {
      // Clean the response text to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No JSON found in response")
      }
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError)
      console.log("Raw response:", text)

      // Fallback response if parsing fails
      parsedResponse = {
        category: "note",
        title: "Extracted Content",
        description: "Content extracted from screenshot",
        url: "",
        extractedText: text.substring(0, 500),
        suggestedDueDate: "",
      }
    }

    // Validate the response structure
    const validCategories = ["job", "product", "place", "food", "person", "note"]
    if (!validCategories.includes(parsedResponse.category)) {
      parsedResponse.category = "note"
    }

    // Ensure all required fields exist
    const finalResponse = {
      category: parsedResponse.category || "note",
      title: parsedResponse.title || "Untitled Task",
      description: parsedResponse.description || "No description available",
      url: parsedResponse.url || "",
      extractedText: parsedResponse.extractedText || "",
      suggestedDueDate: parsedResponse.suggestedDueDate || "",
    }

    return NextResponse.json(finalResponse)
  } catch (error) {
    console.error("Error analyzing image with Gemini:", error)

    // Return a fallback response instead of an error
    return NextResponse.json({
      category: "note",
      title: "Analysis Error",
      description: "Unable to analyze image content",
      url: "",
      extractedText: "Error occurred during text extraction",
      suggestedDueDate: "",
    })
  }
}
