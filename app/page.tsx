"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, ImageIcon, Loader2, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTask } from "@/contexts/TaskContext"
import { OnboardingRedirect } from "@/components/OnboardingRedirect"

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const router = useRouter()
  const { setCurrentTask } = useTask()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPEG)")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB")
      return
    }

    setUploading(true)

    // Create preview URL
    const imageUrl = URL.createObjectURL(file)
    setUploadedImage(imageUrl)

    try {
      // Convert file to base64 for API
      const base64 = await fileToBase64(file)

      // Call Gemini OCR API
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64 }),
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      // Set current task with OCR results
      setCurrentTask({
        ...result,
        imageUrl,
        status: "pending",
        smartMonitoring: false,
      })

      // Navigate to task creation page
      router.push("/create-task")
    } catch (error) {
      console.error("Error analyzing image:", error)
      alert(`Error analyzing image: ${error.message || "Please try again."}`)
      setUploadedImage(null)
    } finally {
      setUploading(false)
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <>
      <OnboardingRedirect />
      <div className="min-h-screen bg-black py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Transform Screenshots into Tasks</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Upload any screenshot and let AI extract actionable tasks with smart categorization and OCR
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                dragActive ? "border-violet-400 bg-violet-400/5" : "border-gray-600 hover:border-gray-500"
              } ${uploading ? "pointer-events-none opacity-50" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploading ? (
                <div className="space-y-4">
                  <Loader2 className="w-16 h-16 text-violet-400 mx-auto animate-spin" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-white">Analyzing your screenshot with AI...</p>
                    <p className="text-gray-400">Using Gemini Vision API for OCR and smart categorization</p>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full animate-pulse w-3/4"></div>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>• Extracting text from image...</p>
                    <p>• Identifying content category...</p>
                    <p>• Detecting URLs and dates...</p>
                    <p>• Generating task suggestions...</p>
                  </div>
                </div>
              ) : uploadedImage ? (
                <div className="space-y-4">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded screenshot"
                    className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg"
                  />
                  <p className="text-green-400 font-medium">Image uploaded successfully!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Upload className="w-12 h-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-medium text-white">Drop your screenshot here</p>
                    <p className="text-gray-400">or click to browse files</p>
                  </div>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <ImageIcon className="w-4 h-4" />
                      <span>PNG, JPEG up to 10MB</span>
                    </div>
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
              />
            </div>

            <div className="mt-8 text-center">
              <Button
                onClick={() => document.querySelector('input[type="file"]')?.click()}
                disabled={uploading}
                className="gradient-violet text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Choose File
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Upload Screenshot</h3>
              <p className="text-gray-400">Drag and drop or select your screenshot</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto">
                <ImageIcon className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">AI Analysis</h3>
              <p className="text-gray-400">OCR extraction and smart categorization</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto">
                <CheckSquare className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Create Task</h3>
              <p className="text-gray-400">Review and save your actionable task</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
