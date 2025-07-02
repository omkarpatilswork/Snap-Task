import { CheckCircle, Sparkles } from "lucide-react"

interface AnalysisSuccessProps {
  category: string
  title: string
}

export function AnalysisSuccess({ category, title }: AnalysisSuccessProps) {
  return (
    <div className="space-y-4 text-center">
      <div className="relative">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
        <Sparkles className="w-6 h-6 text-violet-400 absolute -top-1 -right-1 animate-pulse" />
      </div>
      <div className="space-y-2">
        <p className="text-lg font-medium text-white">Analysis Complete!</p>
        <p className="text-gray-400">
          Detected: <span className="text-violet-400 font-medium capitalize">{category}</span>
        </p>
        <p className="text-sm text-gray-500 max-w-md mx-auto truncate">"{title}"</p>
      </div>
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 max-w-sm mx-auto">
        <p className="text-sm text-green-400">Ready to create your task!</p>
      </div>
    </div>
  )
}
