import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Convertir IncomingHttpHeaders a Headers
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) {
      headers.append(key, Array.isArray(value) ? value.join(",") : value);
    }
  }

  const session = await auth.api.getSession({ headers });
  res.status(200).json(session);
}