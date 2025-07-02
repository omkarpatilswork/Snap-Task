"use client"

import { useState } from "react"
import { Filter, Calendar, ExternalLink, Bell, BellOff, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTask } from "@/contexts/TaskContext"
import { CategoryBadge } from "@/components/CategoryBadge"
import { SmartMonitoringTooltip } from "@/components/SmartMonitoringTooltip"

export default function TasksPage() {
  const { tasks, updateTask, deleteTask } = useTask()
  const [filter, setFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"created" | "due">("created")

  const categories = [
    { value: "all", label: "All Tasks" },
    { value: "job", label: "Jobs" },
    { value: "product", label: "Products" },
    { value: "place", label: "Places" },
    { value: "food", label: "Food" },
    { value: "person", label: "People" },
    { value: "note", label: "Notes" },
  ]

  const filteredTasks = tasks
    .filter((task) => filter === "all" || task.category === filter)
    .sort((a, b) => {
      if (sortBy === "created") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }
    })

  const toggleSmartMonitoring = (taskId: string, currentStatus: boolean) => {
    updateTask(taskId, { smartMonitoring: !currentStatus })
  }

  const toggleTaskStatus = (taskId: string, currentStatus: "pending" | "done") => {
    updateTask(taskId, { status: currentStatus === "pending" ? "done" : "pending" })
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Your Tasks</h1>
            <p className="text-gray-400">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""} total
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#1A1A1A] border border-gray-600 rounded-lg px-4 py-2 text-white"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "created" | "due")}
              className="bg-[#1A1A1A] border border-gray-600 rounded-lg px-4 py-2 text-white"
            >
              <option value="created">Sort by Created</option>
              <option value="due">Sort by Due Date</option>
            </select>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tasks found</h3>
            <p className="text-gray-400 mb-6">
              {filter === "all"
                ? "You haven't created any tasks yet. Upload a screenshot to get started!"
                : `No tasks found in the ${categories.find((c) => c.value === filter)?.label.toLowerCase()} category.`}
            </p>
            <Button onClick={() => (window.location.href = "/")} className="gradient-violet text-white">
              Upload Screenshot
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div key={task.id} className="bg-[#1A1A1A] rounded-xl p-6 card-hover border border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <CategoryBadge category={task.category} />
                  <div className="flex items-center space-x-2">
                    <SmartMonitoringTooltip>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSmartMonitoring(task.id, task.smartMonitoring)}
                        className={`p-1 ${
                          task.smartMonitoring
                            ? "text-violet-400 hover:text-violet-300"
                            : "text-gray-500 hover:text-gray-400"
                        }`}
                      >
                        {task.smartMonitoring ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                      </Button>
                    </SmartMonitoringTooltip>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <img
                    src={task.imageUrl || "/placeholder.svg"}
                    alt="Task screenshot"
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-white text-lg leading-tight">{task.title}</h3>

                  <p className="text-gray-400 text-sm line-clamp-2">{task.description}</p>

                  {task.url && (
                    <a
                      href={task.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-violet-400 hover:text-violet-300 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="truncate">View Link</span>
                    </a>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTaskStatus(task.id, task.status)}
                      className={`text-xs px-3 py-1 rounded-full ${
                        task.status === "done"
                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                      }`}
                    >
                      {task.status === "done" ? "Done" : "Pending"}
                    </Button>
                  </div>

                  {task.smartMonitoring && (
                    <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-3 mt-3">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-violet-400" />
                        <span className="text-sm text-violet-400 font-medium">Smart Monitoring Active</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {task.category === "product" && "Tracking price changes"}
                        {task.category === "job" && "Monitoring application deadline"}
                        {task.category === "place" && "Watching for events and updates"}
                        {task.category === "food" && "Checking availability and offers"}
                        {(task.category === "person" || task.category === "note") && "Monitoring for updates"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
