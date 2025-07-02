import { Briefcase, ShoppingBag, MapPin, UtensilsCrossed, User, FileText } from "lucide-react"

interface CategoryBadgeProps {
  category: "job" | "product" | "place" | "food" | "person" | "note"
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const categoryConfig = {
    job: {
      label: "Job",
      icon: Briefcase,
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    product: {
      label: "Product",
      icon: ShoppingBag,
      color: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    place: {
      label: "Place",
      icon: MapPin,
      color: "bg-red-500/20 text-red-400 border-red-500/30",
    },
    food: {
      label: "Food",
      icon: UtensilsCrossed,
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    },
    person: {
      label: "Person",
      icon: User,
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    },
    note: {
      label: "Note",
      icon: FileText,
      color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    },
  }

  const config = categoryConfig[category]
  const IconComponent = config.icon

  return (
    <div
      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${config.color}`}
    >
      <IconComponent className="w-4 h-4" />
      <span>{config.label}</span>
    </div>
  )
}
