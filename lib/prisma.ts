import { PrismaClient } from "@prisma/client"

// Usamos una variable global para evitar que Prisma cree múltiples instancias
// cuando se ejecuta en modo desarrollo con hot-reload.
// Esto es importante porque Next.js reinicia módulos frecuentemente en dev.
const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

// Exportamos una única instancia de Prisma.
// - Si ya existe en global, la reutilizamos.
// - Si no, creamos una nueva.
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient()

// En desarrollo, guardamos la instancia en global
// para que no se creen múltiples conexiones a la base de datos.
if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prisma