"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, LayoutDashboard, BarChart3} from "lucide-react"
import clsx from "clsx"

const menuItems = [
  { name: "inicio", path: "/dashboard", icon: LayoutDashboard },
  { name: "usuarios", path: "/users", icon: User },
  { name: "reportes", path: "/repost", icon: BarChart3 },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-600 to-blue-500 text-white p-6">
      <h1 className="text-2xl font-bold mb-10 tracking-wide">
        Galactic World
      </h1>

      <nav className="space-y-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.path)

          return (
            <Link
              key={item.name}
              href={item.path}
              className={clsx(
                "flex items-center gap-3 transition",
                isActive
                  ? "font-semibold"
                  : "opacity-80 hover:opacity-100"
              )}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}