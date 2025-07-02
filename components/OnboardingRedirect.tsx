"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useOnboarding } from "@/contexts/OnboardingContext"

export function OnboardingRedirect() {
  const { isOnboardingComplete } = useOnboarding()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Don't redirect if already on onboarding page
    if (pathname === "/onboarding") return

    // Redirect to onboarding if not completed
    if (!isOnboardingComplete) {
      router.push("/onboarding")
    }
  }, [isOnboardingComplete, router, pathname])

  return null
}
