"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, LayoutDashboard, BarChart3 } from "lucide-react"
import clsx from "clsx"
import { authClient } from "@/lib/auth-client"
import { isAdmin } from "@/utils/authHelpers"

export function AppSidebar() {
  const pathname = usePathname()
  const { data: session } = authClient.useSession()
  console.log("Sesión actual:", session)

  // Menú base (siempre visible)
  const baseItems = [
    { name: "Ingresos y Egresos", path: "/dashboard", icon: LayoutDashboard },
  ]

  // Menú solo para administradores
  const adminItems = [
    { name: "Usuarios", path: "/users", icon: User },
    { name: "Reportes", path: "/reports", icon: BarChart3 },
  ]

  // Decidir qué items mostrar
  const menuItems = isAdmin(session) ? [...baseItems, ...adminItems] : baseItems

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-600 to-blue-500 text-white p-6">
      <h1 className="text-2xl font-bold mb-10 tracking-wide">
        FinTrack 
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
                isActive ? "font-semibold" : "opacity-80 hover:opacity-100"
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