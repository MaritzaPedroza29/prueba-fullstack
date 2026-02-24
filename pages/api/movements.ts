import type { NextApiRequest, NextApiResponse } from "next"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
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

// Handler principal de la API de movimientos.
// Permite dos métodos: POST (crear movimiento) y GET (listar movimientos).
// Protege las rutas con autenticación y rol de administrador para creación.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Obtener sesión desde BetterAuth usando los headers normalizados
  const session = await auth.api.getSession({ headers: normalizeHeaders(req) })

  // Validar que exista sesión
  if (!session) {
    return res.status(401).json({ error: "No autorizado" })
  }

  // Método POST → crear nuevo movimiento
  if (req.method === "POST") {
    // Solo administradores pueden crear movimientos
    if (session.user.role !== Role.ADMIN) {
      return res.status(403).json({ error: "Solo administradores pueden crear movimientos" })
    }

    // Extraer datos del cuerpo de la petición
    const { concept, amount, type, date } = req.body

    // Crear movimiento en la base de datos
    const nuevoMovimiento = await prisma.movement.create({
      data: {
        concept,
        amount: parseFloat(amount),
        type: type as MovementType,
        date: new Date(date),
        userId: session.user.id, // asociar al usuario que lo creó
      },
    })

    return res.status(201).json(nuevoMovimiento)
  }

  // Método GET → listar movimientos
  if (req.method === "GET") {
    const movimientos = await prisma.movement.findMany({
      include: { user: true }, // incluir datos del usuario
      orderBy: { date: "desc" }, // ordenar por fecha descendente
    })

    // Formatear respuesta con campos relevantes
    const response = movimientos.map(m => ({
      id: m.id,
      concept: m.concept,
      amount: m.amount,
      type: m.type,
      date: new Date(m.date).toLocaleDateString("es-CO"),
      user: m.user?.name ?? "",
    }))

    return res.json(response)
  }

  // Si el método no está permitido, devolver 405
  return res.status(405).json({ error: "Método no permitido" })
}