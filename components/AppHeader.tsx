"use client"

import Link from "next/link"
import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authClient } from "../lib/auth-client"
import { useRouter } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

// Props que recibe el encabezado:
// - onToggleSidebar: función para abrir/cerrar el sidebar
// - user: datos del usuario autenticado (nombre, email, imagen)
interface AppHeaderProps {
  onToggleSidebar?: () => void
  user?: {
    name?: string
    email?: string
    image?: string
  }
}
// Componente principal del encabezado de la aplicación.
// Contiene:
// - Botón para abrir/cerrar el sidebar
// - Link al dashboard
// - Icono de notificaciones
// - Menú desplegable con avatar y opciones de usuario

export default function AppHeader({ onToggleSidebar, user }: AppHeaderProps) {
   const router = useRouter()

    // Función para cerrar sesión:
      // Llama al cliente de autenticación y luego redirige al inicio
    const handleSignOut = async () => {
      await authClient.signOut() 
      router.push("/")    
    }

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="flex items-center justify-between h-16 px-6">

        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" className="font-semibold text-lg">
            Dashboard
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Notifications */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image} />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                Configuración
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  )
}