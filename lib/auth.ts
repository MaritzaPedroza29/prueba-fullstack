import { betterAuth } from "better-auth"; 
import { prismaAdapter } from "better-auth/adapters/prisma"; 
import { prisma } from "./prisma";


export const auth = betterAuth({

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }), 

  socialProviders: { 
            github: { clientId: process.env.GITHUB_CLIENT_ID!, clientSecret: process.env.GITHUB_CLIENT_SECRET!, }, 
        },

  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_BASE_URL!,

  user: { 
            additionalFields: {  
                role: { type: "string" },
            },
        },
        
  events: {
    async onUserCreated(user: { id: string; }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "ADMIN" },
      });
    },
  },

});
