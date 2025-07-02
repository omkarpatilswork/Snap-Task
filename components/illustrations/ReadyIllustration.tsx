export function ReadyIllustration() {
  return (
    <div className="relative">
      <svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Success Circle */}
        <circle cx="96" cy="96" r="60" fill="url(#successGradient)" className="animate-pulse" />

        {/* Checkmark Path */}
        <path
          d="M70 96L86 112L122 76"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-draw"
        />

        {/* Sparkle Effects */}
        <g className="animate-spin" style={{ transformOrigin: "96px 96px", animationDuration: "4s" }}>
          <circle cx="96" cy="36" r="3" fill="#FFD700" className="animate-pulse" />
          <circle cx="156" cy="96" r="3" fill="#FFD700" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
          <circle cx="96" cy="156" r="3" fill="#FFD700" className="animate-pulse" style={{ animationDelay: "1s" }} />
          <circle cx="36" cy="96" r="3" fill="#FFD700" className="animate-pulse" style={{ animationDelay: "1.5s" }} />
        </g>

        {/* Additional Sparkles */}
        <circle cx="130" cy="50" r="2" fill="#8A2BE2" className="animate-ping" />
        <circle cx="62" cy="142" r="2" fill="#8A2BE2" className="animate-ping" style={{ animationDelay: "0.3s" }} />
        <circle cx="142" cy="142" r="2" fill="#8A2BE2" className="animate-ping" style={{ animationDelay: "0.6s" }} />
        <circle cx="50" cy="50" r="2" fill="#8A2BE2" className="animate-ping" style={{ animationDelay: "0.9s" }} />

        <defs>
          <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
