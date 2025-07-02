"use client"

import { Bell, TrendingDown, Clock, MapPin, DollarSign } from "lucide-react"

export default function NotificationsPage() {
  // Mock notifications data
  const notifications = [
    {
      id: "1",
      type: "price_drop",
      title: "Price Drop Alert",
      message: "MacBook Pro M3 price dropped by $200",
      timestamp: "2 hours ago",
      icon: TrendingDown,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      id: "2",
      type: "deadline",
      title: "Application Deadline",
      message: "Software Engineer position at TechCorp closes in 3 days",
      timestamp: "1 day ago",
      icon: Clock,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      id: "3",
      type: "event",
      title: "Event Update",
      message: "New restaurant opened near your saved location",
      timestamp: "3 days ago",
      icon: MapPin,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "4",
      type: "offer",
      title: "Special Offer",
      message: "Limited time discount on your saved food item",
      timestamp: "1 week ago",
      icon: DollarSign,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
  ]

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-gray-400">Stay updated with your smart monitoring alerts</p>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No notifications yet</h3>
            <p className="text-gray-400">
              Enable smart monitoring on your tasks to receive alerts about price drops, deadlines, and more.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => {
              const IconComponent = notification.icon
              return (
                <div
                  key={notification.id}
                  className="bg-[#1A1A1A] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${notification.bgColor}`}>
                      <IconComponent className={`w-6 h-6 ${notification.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">{notification.title}</h3>
                        <span className="text-sm text-gray-500">{notification.timestamp}</span>
                      </div>
                      <p className="text-gray-300 mb-3">{notification.message}</p>
                      <div className="flex items-center space-x-3">
                        <button className="text-violet-400 hover:text-violet-300 text-sm font-medium">View Task</button>
                        <button className="text-gray-500 hover:text-gray-400 text-sm">Mark as Read</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-12 bg-[#1A1A1A] rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Smart Monitoring Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-violet-400">Product Tracking</h4>
              <p className="text-sm text-gray-400">Get notified when prices drop on saved products</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-violet-400">Job Deadlines</h4>
              <p className="text-sm text-gray-400">Receive reminders for application deadlines</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-violet-400">Event Updates</h4>
              <p className="text-sm text-gray-400">Stay informed about events at saved locations</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-violet-400">Special Offers</h4>
              <p className="text-sm text-gray-400">Don't miss limited-time deals and discounts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
