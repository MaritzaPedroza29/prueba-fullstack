import { betterAuth } from "better-auth"; 
import { prismaAdapter } from "better-auth/adapters/prisma"; 
import { prisma } from "./prisma";
import { PrismaClient } from "@prisma/client";
console.log("🔥 AUTH.TS SE ESTA CARGANDO");
console.log("baseUrl:",process.env.BETTER_AUTH_BASE_URL)

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_BASE_URL,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }), 

  socialProviders: { 
            github: { clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET!, }, 
        },
  secret: process.env.BETTER_AUTH_SECRET!,
  user: { 
            additionalFields: {  
                role: { type: "string" },
            },
        },
        
  events: {
    async onUserCreated(user: { id: any; }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "ADMIN" },
      });
    },
  },

});
