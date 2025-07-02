import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TaskProvider } from "@/contexts/TaskContext"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { OnboardingProvider } from "@/contexts/OnboardingContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SnapTask - Convert Screenshots to Tasks",
  description: "Transform your screenshots into actionable tasks with AI-powered OCR and categorization",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <OnboardingProvider>
          <TaskProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </TaskProvider>
        </OnboardingProvider>
      </body>
    </html>
  )
}
