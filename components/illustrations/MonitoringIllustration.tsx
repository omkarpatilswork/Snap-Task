import { Bell } from "lucide-react"

export function MonitoringIllustration() {
  return (
    <div className="relative">
      <svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Radar Circles */}
        <circle
          cx="96"
          cy="96"
          r="60"
          stroke="#8A2BE2"
          strokeWidth="2"
          strokeOpacity="0.3"
          fill="none"
          className="animate-ping"
        />
        <circle
          cx="96"
          cy="96"
          r="40"
          stroke="#8A2BE2"
          strokeWidth="2"
          strokeOpacity="0.5"
          fill="none"
          className="animate-ping"
          style={{ animationDelay: "0.5s" }}
        />
        <circle
          cx="96"
          cy="96"
          r="20"
          stroke="#8A2BE2"
          strokeWidth="2"
          strokeOpacity="0.7"
          fill="none"
          className="animate-ping"
          style={{ animationDelay: "1s" }}
        />

        {/* Central Bell */}
        <circle cx="96" cy="96" r="16" fill="url(#monitoringGradient)" className="animate-pulse" />

        {/* Scanning Line */}
        <line
          x1="96"
          y1="96"
          x2="96"
          y2="36"
          stroke="#8A2BE2"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-spin"
          style={{ transformOrigin: "96px 96px", animationDuration: "3s" }}
        />

        {/* Notification Dots */}
        <circle cx="130" cy="66" r="4" fill="#8A2BE2" className="animate-bounce" />
        <circle cx="62" cy="130" r="4" fill="#8A2BE2" className="animate-bounce" style={{ animationDelay: "0.3s" }} />
        <circle cx="130" cy="126" r="4" fill="#8A2BE2" className="animate-bounce" style={{ animationDelay: "0.6s" }} />

        <defs>
          <linearGradient id="monitoringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A2BE2" />
            <stop offset="100%" stopColor="#9932CC" />
          </linearGradient>
        </defs>
      </svg>

      {/* Bell Icon */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Bell className="w-6 h-6 text-white animate-pulse" />
      </div>
    </div>
  )
}
