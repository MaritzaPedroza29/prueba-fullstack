import type { NextApiRequest, NextApiResponse } from "next"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client"

// Función auxiliar para normalizar los headers.
// Convierte los valores de los headers en strings planos.
// - Si el valor es string, lo guarda directamente.
// - Si es un array, lo une con comas.
// Esto es necesario porque algunas librerías esperan headers en formato string.
function normalizeHeaders(req: NextApiRequest): Record<string, string> {
  const headers: Record<string, string> = {}
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === "string") headers[key] = value
    else if (Array.isArray(value)) headers[key] = value.join(",")
  }
  return headers
}

// Handler principal de la API para gestión de usuarios.
// Protege las rutas con autenticación y rol de administrador.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Obtener sesión desde BetterAuth usando los headers normalizados
  const session = await auth.api.getSession({ headers: normalizeHeaders(req) })

  // Validar que exista sesión y que el usuario sea ADMIN
  if (!session || session.user.role !== Role.ADMIN) {
    return res.status(403).json({ error: "No autorizado" })
  }

  // Método GET → listar usuarios
  if (req.method === "GET") {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, phone: true, role: true },
      orderBy: { name: "asc" }, // ordenar por nombre
    })
    return res.json(users)
  }

  // Método PUT → actualizar usuario
  if (req.method === "PUT") {
    const { id, name, role } = req.body
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, role },
      select: { id: true, name: true, email: true, phone: true, role: true },
    })
    return res.json(updatedUser)
  }

  // Si el método no está permitido, devolver 405
  return res.status(405).json({ error: "Método no permitido" })
}