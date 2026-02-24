import { Role } from "@prisma/client" // Enum Role definido en Prisma
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

// Función auxiliar para proteger rutas según roles.
// Recibe un array de roles permitidos y valida la sesión actual.
// - Si no hay sesión o el rol del usuario no está en la lista, redirige al login.
// - Si cumple, retorna la sesión para que pueda usarse en la página/acción.
export async function requireRole(roles: Role[]) {
  // Obtener sesión actual desde BetterAuth
  const session = await auth.api.getSession()

  // Validar que exista sesión y que el rol esté permitido
  if (!session || !roles.includes(session.user.role as Role)) {
    redirect("/") // Redirige al login si no cumple
  }

  // Retorna la sesión válida
  return session
}