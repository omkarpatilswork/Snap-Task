export const config = {
  geminiApiKey: process.env.GEMINI_API_KEY || "AIzaSyBukxwixzr1WUYvcVFUeVYHENQ0ZbWYASM",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
}
