type Session = {
  user?: {
    id?: string
    email?: string
    name?: string
    role?: string
    image?: string | null
    // otras propiedades que quieras permitir
  }
  // si tu authClient devuelve más cosas, puedes agregarlas aquí
  session?: {
    id?: string
    createdAt?: Date
    updatedAt?: Date
    // etc...
  }
}
export function isAdmin(session: Session | null): boolean {
  return session?.user?.role === "ADMIN" || session?.user?.role === "ADMINISTRADOR"
}