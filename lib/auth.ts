import { betterAuth } from "better-auth"; 
import { prismaAdapter } from "better-auth/adapters/prisma"; 
import { prisma } from "./prisma";

// Configuración principal de BetterAuth.
// Se integra con Prisma para manejar usuarios y sesiones.
// Define proveedores sociales, secretos y eventos personalizados.
export const auth = betterAuth({
  // Adaptador de base de datos usando Prisma
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }), 

  // Proveedor social: GitHub
  // Permite autenticación con OAuth usando las credenciales de GitHub
  socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID!, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET!, 
    }, 
  },

  // Secretos y configuración base
  secret: process.env.BETTER_AUTH_SECRET!, // clave secreta para firmar tokens
  baseURL: process.env.BETTER_AUTH_BASE_URL!, // URL base de la aplicación

  // Configuración de usuario
  // Se añaden campos adicionales al modelo de usuario
  user: { 
    additionalFields: {  
      role: { type: "string" }, // campo extra para rol (ej. ADMIN, USER)
    }, 
  },
        
  // Eventos personalizados
  events: {
    // Evento que se ejecuta al crear un usuario nuevo
    async onUserCreated(user: { id: string; }) {
      // Por defecto, asigna el rol ADMIN al usuario recién creado
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "ADMIN" },
      });
    },
  },
});