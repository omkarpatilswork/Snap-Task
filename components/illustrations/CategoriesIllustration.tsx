import { Briefcase, ShoppingBag, MapPin, UtensilsCrossed, User, FileText } from "lucide-react"

export function CategoriesIllustration() {
  const categories = [
    { icon: Briefcase, delay: "0s", position: { x: 96, y: 40 } },
    { icon: ShoppingBag, delay: "0.1s", position: { x: 140, y: 70 } },
    { icon: MapPin, delay: "0.2s", position: { x: 140, y: 122 } },
    { icon: UtensilsCrossed, delay: "0.3s", position: { x: 96, y: 152 } },
    { icon: User, delay: "0.4s", position: { x: 52, y: 122 } },
    { icon: FileText, delay: "0.5s", position: { x: 52, y: 70 } },
  ]

  return (
    <div className="relative">
      <svg width="192" height="192" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Central Hub */}
        <circle cx="96" cy="96" r="20" fill="url(#categoryGradient)" className="animate-pulse" />

        {/* Connection Lines */}
        {categories.map((category, index) => (
          <line
            key={index}
            x1="96"
            y1="96"
            x2={category.position.x}
            y2={category.position.y}
            stroke="#8A2BE2"
            strokeWidth="2"
            strokeOpacity="0.3"
            className="animate-pulse"
            style={{ animationDelay: category.delay }}
          />
        ))}

        <defs>
          <linearGradient id="categoryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A2BE2" />
            <stop offset="100%" stopColor="#9932CC" />
          </linearGradient>
        </defs>
      </svg>

      {/* Category Icons */}
      {categories.map((category, index) => {
        const IconComponent = category.icon
        return (
          <div
            key={index}
            className="absolute w-8 h-8 bg-violet-500/20 rounded-full flex items-center justify-center animate-bounce"
            style={{
              left: `${(category.position.x / 192) * 100}%`,
              top: `${(category.position.y / 192) * 100}%`,
              transform: "translate(-50%, -50%)",
              animationDelay: category.delay,
              animationDuration: "2s",
            }}
          >
            <IconComponent className="w-4 h-4 text-violet-400" />
          </div>
        )
      })}
    </div>
  )
}
