// pages/api/reports.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
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
  const session = await auth.api.getSession({ headers: normalizeHeaders(req) })
  if (!session) return res.status(401).json({ error: "No autorizado" })
  if (session.user.role !== Role.ADMIN) return res.status(403).json({ error: "Solo administradores" })

  if (req.method === "GET") {
    const movimientos = await prisma.movement.findMany({ orderBy: { date: "asc" } })

    const totalIngresos = movimientos
    .filter(m => m.type === MovementType.INCOME)
    .reduce((acc, m) => acc + Number(m.amount), 0)
    
    const totalEgresos = movimientos
    .filter(m => m.type === MovementType.EXPENSE)
    .reduce((acc, m) => acc + Number(m.amount), 0)

    const saldo = totalIngresos - totalEgresos

    return res.json({ movimientos, saldo })
  }

  if (req.method === "POST") {
    // Generar CSV
    const movimientos = await prisma.movement.findMany({ orderBy: { date: "asc" }, include: { user: true } })
    const csv = [
      ["Concepto", "Monto", "Tipo", "Fecha", "Usuario"].join(","),
      ...movimientos.map(m =>
        [m.concept, m.amount, m.type, new Date(m.date).toLocaleDateString("es-CO"), m.user?.name ?? ""].join(",")
      )
    ].join("\n")

    res.setHeader("Content-Type", "text/csv")
    res.setHeader("Content-Disposition", "attachment; filename=report.csv")
    return res.send(csv)
  }

  return res.status(405).json({ error: "Método no permitido" })
}