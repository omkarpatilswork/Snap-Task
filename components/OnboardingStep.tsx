import { WelcomeIllustration } from "./illustrations/WelcomeIllustration"
import { CategoriesIllustration } from "./illustrations/CategoriesIllustration"
import { MonitoringIllustration } from "./illustrations/MonitoringIllustration"
import { ReadyIllustration } from "./illustrations/ReadyIllustration"

interface OnboardingStepProps {
  step: {
    id: number
    illustration: string
    headline: string
    description: string
  }
}

export function OnboardingStep({ step }: OnboardingStepProps) {
  const getIllustration = (type: string) => {
    switch (type) {
      case "welcome":
        return <WelcomeIllustration />
      case "categories":
        return <CategoriesIllustration />
      case "monitoring":
        return <MonitoringIllustration />
      case "ready":
        return <ReadyIllustration />
      default:
        return <WelcomeIllustration />
    }
  }

  return (
    <div className="text-center space-y-8">
      {/* Illustration */}
      <div className="flex justify-center mb-8">
        <div className="w-48 h-48 flex items-center justify-center">{getIllustration(step.illustration)}</div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{step.headline}</h1>
        <p className="text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">{step.description}</p>
      </div>
    </div>
  )
}
