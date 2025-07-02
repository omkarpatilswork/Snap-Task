"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Upload, CheckSquare, Bell } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Upload", icon: Upload },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/notifications", label: "Notifications", icon: Bell },
  ]

  return (
    <nav className="bg-[#1A1A1A] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ST</span>
            </div>
            <span className="text-xl font-bold text-white">SnapTask</span>
          </Link>

          <div className="flex space-x-8">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? "text-violet-400 bg-violet-400/10"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
