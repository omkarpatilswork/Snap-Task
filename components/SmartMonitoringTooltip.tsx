"use client"

import type React from "react"

import { useState } from "react"
import { Bell } from "lucide-react"

interface SmartMonitoringTooltipProps {
  children: React.ReactNode
}

export function SmartMonitoringTooltip({ children }: SmartMonitoringTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} className="cursor-help">
        {children}
      </div>

      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-[#1A1A1A] border border-violet-500 rounded-lg p-3 shadow-xl max-w-xs animate-fade-in">
            <div className="flex items-start space-x-2">
              <Bell className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-white font-medium mb-1">Smart Monitoring</p>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Smart Monitoring keeps an eye on your tasks for price drops, deadlines, and events. We'll notify you
                  automatically.
                </p>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="border-4 border-transparent border-t-violet-500"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
