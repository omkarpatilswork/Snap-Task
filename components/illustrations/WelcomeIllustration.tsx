export function WelcomeIllustration() {
  return (
    <div className="relative">
      <svg
        width="192"
        height="192"
        viewBox="0 0 192 192"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-float"
      >
        {/* Background Circle */}
        <circle cx="96" cy="96" r="80" fill="url(#gradient1)" fillOpacity="0.1" className="animate-pulse" />

        {/* SnapTask Logo */}
        <rect x="56" y="56" width="80" height="80" rx="16" fill="url(#gradient2)" className="drop-shadow-lg" />

        {/* ST Text */}
        <text x="96" y="106" textAnchor="middle" className="fill-white text-2xl font-bold" style={{ fontSize: "24px" }}>
          ST
        </text>

        {/* Screenshot Icon */}
        <rect
          x="120"
          y="40"
          width="32"
          height="24"
          rx="4"
          fill="#8A2BE2"
          fillOpacity="0.8"
          className="animate-bounce"
          style={{ animationDelay: "0.5s" }}
        />

        {/* Sparkles */}
        <circle cx="40" cy="60" r="2" fill="#8A2BE2" className="animate-ping" />
        <circle cx="152" cy="80" r="2" fill="#8A2BE2" className="animate-ping" style={{ animationDelay: "0.3s" }} />
        <circle cx="160" cy="120" r="2" fill="#8A2BE2" className="animate-ping" style={{ animationDelay: "0.6s" }} />

        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A2BE2" />
            <stop offset="100%" stopColor="#9932CC" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A2BE2" />
            <stop offset="100%" stopColor="#9932CC" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
