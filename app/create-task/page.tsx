"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, LinkIcon, Save, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useTask } from "@/contexts/TaskContext"
import { CategoryBadge } from "@/components/CategoryBadge"

export default function CreateTaskPage() {
  const { currentTask, setCurrentTask, addTask } = useTask()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    dueDate: "",
    category: "note" as const,
  })

  useEffect(() => {
    if (!currentTask) {
      router.push("/")
      return
    }

    setFormData({
      title: currentTask.title || "",
      description: currentTask.description || "",
      url: currentTask.url || "",
      dueDate: currentTask.dueDate || "",
      category: currentTask.category || "note",
    })
  }, [currentTask, router])

  const handleSave = () => {
    if (!currentTask) return

    addTask({
      ...formData,
      imageUrl: currentTask.imageUrl!,
      status: "pending",
      smartMonitoring: false,
      extractedText: currentTask.extractedText,
    })

    setCurrentTask(null)
    router.push("/tasks")
  }

  if (!currentTask) {
    return null
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Review Your Task</h1>
          <p className="text-gray-400">Edit the details and save your task</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Preview */}
          <div className="space-y-6">
            <div className="bg-[#1A1A1A] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Original Screenshot</h3>
              <img
                src={currentTask.imageUrl || "/placeholder.svg"}
                alt="Uploaded screenshot"
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {currentTask.extractedText && (
              <div className="bg-[#1A1A1A] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Extracted Text</h3>
                <div className="bg-black/50 rounded-lg p-4 text-sm text-gray-300 max-h-40 overflow-y-auto">
                  {currentTask.extractedText}
                </div>
              </div>
            )}
          </div>

          {/* Task Details */}
          <div className="space-y-6">
            <div className="bg-[#1A1A1A] rounded-xl p-6 card-hover">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Task Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-violet-400 hover:text-violet-300"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? "Preview" : "Edit"}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <CategoryBadge category={formData.category} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  {isEditing ? (
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-black/50 border-gray-600 text-white"
                      placeholder="Enter task title"
                    />
                  ) : (
                    <p className="text-white bg-black/50 rounded-md p-3">{formData.title || "No title extracted"}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  {isEditing ? (
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-black/50 border-gray-600 text-white min-h-[100px]"
                      placeholder="Enter task description"
                    />
                  ) : (
                    <p className="text-white bg-black/50 rounded-md p-3 min-h-[100px]">
                      {formData.description || "No description available"}
                    </p>
                  )}
                </div>

                {formData.url && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">URL</label>
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="w-4 h-4 text-violet-400" />
                      <a
                        href={formData.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-400 hover:text-violet-300 truncate"
                      >
                        {formData.url}
                      </a>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
                  {isEditing ? (
                    <div className="relative">
                      <Input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        className="bg-black/50 border-gray-600 text-white"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  ) : (
                    <p className="text-white bg-black/50 rounded-md p-3">
                      {formData.dueDate ? new Date(formData.dueDate).toLocaleDateString() : "No due date set"}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex space-x-4">
                <Button onClick={handleSave} className="flex-1 gradient-violet text-white hover:opacity-90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Task
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/")}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
