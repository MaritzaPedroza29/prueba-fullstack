"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, LayoutDashboard, BarChart3 } from "lucide-react"
import clsx from "clsx"
import { authClient } from "@/lib/auth-client"
import { isAdmin } from "@/utils/authHelpers"

// Componente de barra lateral de la aplicación.
// Muestra enlaces de navegación según el rol del usuario.
// - Siempre muestra el menú base (Ingresos y Egresos)
// - Si el usuario es administrador, añade Usuarios y Reportes
export function AppSidebar() {
  const pathname = usePathname()
  const { data: session } = authClient.useSession()

  // Menú base (visible para todos los usuarios)
  const baseItems = [
    { name: "Ingresos y Egresos", path: "/dashboard", icon: LayoutDashboard },
  ]

  // Menú adicional solo para administradores
  const adminItems = [
    { name: "Usuarios", path: "/users", icon: User },
    { name: "Reportes", path: "/reports", icon: BarChart3 },
  ]

  // Decidir qué items mostrar según el rol
  const menuItems = isAdmin(session) ? [...baseItems, ...adminItems] : baseItems

  return (
    // Aside con estilo moderno:
    // - ancho fijo (w-64)
    // - altura mínima pantalla completa (min-h-screen)
    // - fondo degradado azul (from-blue-600 to-blue-500)
    // - texto blanco
    // - padding interno
    <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-600 to-blue-500 text-white p-6">
      
      {/* Título de la aplicación */}
      <h1 className="text-2xl font-bold mb-10 tracking-wide">
        FinTrack 
      </h1>

      {/* Navegación con espacio entre enlaces */}
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
                // Si la ruta está activa, resaltar con font-semibold
                // Si no, opacidad reducida con hover para mejorar UX
                isActive ? "font-semibold" : "opacity-80 hover:opacity-100"
              )}
            >
              {/* Icono del menú */}
              <Icon size={20} />
              {/* Nombre del menú */}
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}