import { Role } from "@prisma/client" // si usas Prisma con enum Role
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function requireRole(roles: Role[]) {
  const session = await auth.api.getSession()

  if (!session || !roles.includes(session.user.role as Role)) {
    redirect("/") // redirige si no cumple
  }

  return session
}