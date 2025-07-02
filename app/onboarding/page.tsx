"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, SkipBackIcon as Skip, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useOnboarding } from "@/contexts/OnboardingContext"
import { OnboardingStep } from "@/components/OnboardingStep"
import { ProgressDots } from "@/components/ProgressDots"

const onboardingSteps = [
  {
    id: 1,
    illustration: "welcome",
    headline: "Turn Screenshots Into Action",
    description: "SnapTask transforms your screenshots into smart, actionable tasks automatically.",
  },
  {
    id: 2,
    illustration: "categories",
    headline: "Automatic Categorization",
    description: "We detect whether it's a job, product, place, or something else—no manual tagging needed.",
  },
  {
    id: 3,
    illustration: "monitoring",
    headline: "Stay Ahead With Smart Monitoring",
    description: "Enable Smart Monitoring to track price drops, deadlines, and events—get notified when it matters.",
  },
  {
    id: 4,
    illustration: "ready",
    headline: "You're All Set!",
    description: "Start uploading your screenshots and supercharge your productivity.",
  },
]

export default function OnboardingPage() {
  const { currentStep, setCurrentStep, totalSteps, setOnboardingComplete } = useOnboarding()
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setIsAnimating(false)
      }, 150)
    } else {
      completeOnboarding()
    }
  }

  const skipOnboarding = () => {
    completeOnboarding()
  }

  const completeOnboarding = () => {
    setOnboardingComplete(true)
    router.push("/")
  }

  const goToStep = (step: number) => {
    if (step !== currentStep) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(step)
        setIsAnimating(false)
      }, 150)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Skip Button */}
        <div className="flex justify-end mb-8">
          <Button
            variant="ghost"
            onClick={skipOnboarding}
            className="text-gray-500 hover:text-gray-300 opacity-60 hover:opacity-100 transition-opacity"
          >
            <Skip className="w-4 h-4 mr-2" />
            Skip
          </Button>
        </div>

        {/* Main Onboarding Card */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-800">
          <div
            className={`transition-all duration-300 ease-in-out ${
              isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
            }`}
          >
            <OnboardingStep step={onboardingSteps[currentStep]} />
          </div>

          {/* Progress Dots */}
          <div className="mt-12 mb-8">
            <ProgressDots currentStep={currentStep} totalSteps={totalSteps} onStepClick={goToStep} />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {currentStep + 1} of {totalSteps}
            </div>

            <Button
              onClick={nextStep}
              className={`gradient-violet text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                currentStep === totalSteps - 1
                  ? "animate-pulse hover:animate-none shadow-lg shadow-violet-500/25"
                  : "hover:opacity-90"
              }`}
            >
              {currentStep === totalSteps - 1 ? (
                <>
                  Get Started
                  <Sparkles className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
