"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface OnboardingContextType {
  isOnboardingComplete: boolean
  setOnboardingComplete: (complete: boolean) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [isOnboardingComplete, setIsOnboardingCompleteState] = useState(true) // Default to true to prevent flash
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = 4

  useEffect(() => {
    // Check localStorage on client side
    const completed = localStorage.getItem("onboardingComplete") === "true"
    setIsOnboardingCompleteState(completed)
  }, [])

  const setOnboardingComplete = (complete: boolean) => {
    localStorage.setItem("onboardingComplete", complete.toString())
    setIsOnboardingCompleteState(complete)
  }

  return (
    <OnboardingContext.Provider
      value={{
        isOnboardingComplete,
        setOnboardingComplete,
        currentStep,
        setCurrentStep,
        totalSteps,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
