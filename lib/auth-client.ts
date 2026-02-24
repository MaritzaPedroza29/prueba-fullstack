"use client";

import { createAuthClient } from "better-auth/react";

// Cliente de autenticación para el lado del cliente (React).
// Se conecta con el servidor de BetterAuth usando la URL pública definida en variables de entorno.
// Esto permite manejar sesión, login y logout desde el frontend.
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!, // URL pública de la app (ej. http://localhost:3000 o dominio en producción)
});