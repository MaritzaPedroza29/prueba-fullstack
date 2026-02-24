import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Role } from "@prisma/client"

function normalizeHeaders(req: NextApiRequest): Record<string, string> {
  const headers: Record<string, string> = {}
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === "string") headers[key] = value
    else if (Array.isArray(value)) headers[key] = value.join(",")
  }
  return headers
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth.api.getSession({ headers: normalizeHeaders(req) })

  if (!session) {
    return res.status(401).json({ error: "No autorizado" })
  }

  const { id } = req.query

  if (req.method === "PUT") {
    // Solo ADMIN puede editar
    if (session.user.role !== Role.ADMIN) {
      return res.status(403).json({ error: "Solo administradores pueden editar usuarios" })
    }

    const { name, role } = req.body

    try {
      const updatedUser = await prisma.user.update({
        where: { id: String(id) },
        data: { name, role },
      })

      return res.status(200).json(updatedUser)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(404).json({ error: "Usuario no encontrado" })
    }
  }

  return res.status(405).json({ error: "Método no permitido" })
}