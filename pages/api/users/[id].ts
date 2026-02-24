import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
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

// Handler principal de la API para edición de usuarios.
// Protege la ruta con autenticación y rol de administrador.
// Permite actualizar nombre y rol de un usuario mediante método PUT.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Obtener sesión desde BetterAuth usando los headers normalizados
  const session = await auth.api.getSession({ headers: normalizeHeaders(req) })

  // Validar que exista sesión
  if (!session) {
    return res.status(401).json({ error: "No autorizado" })
  }

  // Extraer id del usuario desde query
  const { id } = req.query

  // Método PUT → actualizar usuario
  if (req.method === "PUT") {
    // Solo ADMIN puede editar
    if (session.user.role !== Role.ADMIN) {
      return res.status(403).json({ error: "Solo administradores pueden editar usuarios" })
    }

    // Extraer datos del cuerpo de la petición
    const { name, role } = req.body

    try {
      // Actualizar usuario en la base de datos
      const updatedUser = await prisma.user.update({
        where: { id: String(id) },
        data: { name, role },
      })

      return res.status(200).json(updatedUser)
    } catch (error) {
      // Si el usuario no existe, devolver 404
      return res.status(404).json({ error: "Usuario no encontrado" })
    }
  }

  // Si el método no está permitido, devolver 405
  return res.status(405).json({ error: "Método no permitido" })
}