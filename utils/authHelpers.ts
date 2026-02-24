// Definición del tipo Session.
// Representa la información de sesión que devuelve el cliente de autenticación.
// Incluye:
// - user: datos básicos del usuario (id, email, nombre, rol, imagen)
// - session: metadatos de la sesión (id, fechas de creación/actualización)

type Session = {
  user?: {
    id?: string
    email?: string
    name?: string
    role?: string
    image?: string | null
  }
  session?: {
    id?: string
    createdAt?: Date
    updatedAt?: Date
  }
}
export function isAdmin(session: Session | null): boolean {
  return session?.user?.role === "ADMIN" || session?.user?.role === "ADMINISTRADOR"
}