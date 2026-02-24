import type { NextApiRequest, NextApiResponse } from "next"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { MovementType, Role } from "@prisma/client"

function normalizeHeaders(req: NextApiRequest): Record<string, string> {
  const headers: Record<string, string> = {}
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === "string") headers[key] = value
    else if (Array.isArray(value)) headers[key] = value.join(",")
  }
  return headers
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 👇 Aquí definimos session ANTES de usarla
  const session = await auth.api.getSession({ headers: normalizeHeaders(req) })

  if (!session) {
    return res.status(401).json({ error: "No autorizado" })
  }

  if (req.method === "POST") {
    if (session.user.role !== Role.ADMIN) {
      return res.status(403).json({ error: "Solo administradores pueden crear movimientos" })
    }

    const { concept, amount, type, date } = req.body

    const nuevoMovimiento = await prisma.movement.create({
      data: {
        concept,
        amount: parseFloat(amount),
        type: type as MovementType,
        date: new Date(date),
        userId: session.user.id,
      },
    })

    return res.status(201).json(nuevoMovimiento)
  }

  if (req.method === "GET") {
   const movimientos = await prisma.movement.findMany({
  include: { user: true },
  orderBy: { date: "desc" },
})

const response = movimientos.map(m => ({
  id: m.id,
  concept: m.concept,       // 👈 ahora coincide con frontend
  amount: m.amount,
  type: m.type,
  date:new Date(m.date).toLocaleDateString("es-CO"),// 👈 siempre string ISO
  user: m.user?.name ?? "",
}))

return res.json(response)
  }

  return res.status(405).json({ error: "Método no permitido" })
}