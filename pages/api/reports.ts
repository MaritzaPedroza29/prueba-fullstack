// pages/api/reports.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { MovementType, Role } from "@prisma/client"

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

// Handler principal de la API de reportes.
// Protege las rutas con autenticación y rol de administrador.
// Permite dos métodos: GET (consultar reportes) y POST (descargar CSV).
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Obtener sesión desde BetterAuth usando los headers normalizados
  const session = await auth.api.getSession({ headers: normalizeHeaders(req) })

  // Validar que exista sesión
  if (!session) return res.status(401).json({ error: "No autorizado" })
  // Validar que el usuario sea ADMIN
  if (session.user.role !== Role.ADMIN) return res.status(403).json({ error: "Solo administradores" })

  // Método GET → calcular saldo y devolver movimientos
  if (req.method === "GET") {
    const movimientos = await prisma.movement.findMany({ orderBy: { date: "asc" } })

    // Calcular total de ingresos
    const totalIngresos = movimientos
      .filter(m => m.type === MovementType.INCOME)
      .reduce((acc, m) => acc + Number(m.amount), 0)

    // Calcular total de egresos
    const totalEgresos = movimientos
      .filter(m => m.type === MovementType.EXPENSE)
      .reduce((acc, m) => acc + Number(m.amount), 0)

    // Saldo = ingresos - egresos
    const saldo = totalIngresos - totalEgresos

    return res.json({ movimientos, saldo })
  }

  // Método POST → generar y devolver CSV con movimientos
  if (req.method === "POST") {
    const movimientos = await prisma.movement.findMany({
      orderBy: { date: "asc" },
      include: { user: true }, // incluir datos del usuario
    })

    // Construir CSV con encabezados y filas
    const csv = [
      ["Concepto", "Monto", "Tipo", "Fecha", "Usuario"].join(","),
      ...movimientos.map(m =>
        [
          m.concept,
          m.amount,
          m.type,
          new Date(m.date).toLocaleDateString("es-CO"),
          m.user?.name ?? "",
        ].join(",")
      )
    ].join("\n")

    // Configurar headers para descarga de archivo
    res.setHeader("Content-Type", "text/csv")
    res.setHeader("Content-Disposition", "attachment; filename=report.csv")
    return res.send(csv)
  }

  // Si el método no está permitido, devolver 405
  return res.status(405).json({ error: "Método no permitido" })
}