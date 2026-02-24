import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/lib/auth";

// Handler de API para obtener la sesión actual.
// Convierte los headers de la request en un objeto Headers válido
// y los pasa al cliente de autenticación para recuperar la sesión.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Convertir IncomingHttpHeaders (objeto plano) a instancia de Headers
  // Esto asegura que la librería de autenticación pueda procesarlos correctamente.
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) {
      headers.append(key, Array.isArray(value) ? value.join(",") : value);
    }
  }

  // Obtener sesión usando BetterAuth con los headers normalizados
  const session = await auth.api.getSession({ headers });

  // Devolver la sesión en formato JSON
  res.status(200).json(session);
}