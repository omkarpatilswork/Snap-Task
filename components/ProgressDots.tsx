"use client"

interface ProgressDotsProps {
  currentStep: number
  totalSteps: number
  onStepClick: (step: number) => void
}

export function ProgressDots({ currentStep, totalSteps, onStepClick }: ProgressDotsProps) {
  return (
    <div className="flex justify-center space-x-3">
      {Array.from({ length: totalSteps }, (_, index) => (
        <button
          key={index}
          onClick={() => onStepClick(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentStep
              ? "bg-violet-500 scale-125 shadow-lg shadow-violet-500/50"
              : index < currentStep
                ? "bg-violet-400/60 hover:bg-violet-400/80"
                : "bg-gray-600 hover:bg-gray-500"
          }`}
          aria-label={`Go to step ${index + 1}`}
        />
      ))}
    </div>
  )
}
