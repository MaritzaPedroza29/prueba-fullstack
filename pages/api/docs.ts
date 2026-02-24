import type { NextApiRequest, NextApiResponse } from "next";
import { createSwaggerSpec } from "next-swagger-doc";

export const swaggerSpec = createSwaggerSpec({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FinTrack API",
      version: "1.0.0",
      description: "Documentación de la API de FinTrack",
    },
    paths: {
      // ✅ Reports
      "/api/reports": {
        get: {
          summary: "Obtener informes financieros",
          description: "Devuelve todos los movimientos financieros y el saldo actual.",
          responses: {
            200: {
              description: "Lista de movimientos y saldo",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      movimientos: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            concept: { type: "string" },
                            amount: { type: "number" },
                            type: { type: "string", enum: ["INCOME", "EXPENSE"] },
                            date: { type: "string", format: "date-time" },
                          },
                        },
                      },
                      saldo: { type: "number" },
                    },
                  },
                  example: {
                    movimientos: [
                      {
                        id: "1",
                        concept: "Pago",
                        amount: 100,
                        type: "INCOME",
                        date: "2026-02-23T12:00:00Z",
                      },
                      {
                        id: "2",
                        concept: "Compra",
                        amount: 50,
                        type: "EXPENSE",
                        date: "2026-02-23T15:00:00Z",
                      },
                    ],
                    saldo: 50,
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Generar reporte CSV",
          description: "Devuelve un archivo CSV con todos los movimientos.",
          responses: {
            200: {
              description: "Archivo CSV generado",
              content: {
                "text/csv": {
                  schema: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
      },

      // ✅ session
      "/api/auth/session": {
        post: {
            summary: "Crear sesión",
            description: "Inicia sesión con GitHub y crea una sesión en la base de datos.",
            responses: {
            200: {
                description: "Sesión creada correctamente",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        user: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            email: { type: "string" },
                            role: { type: "string", enum: ["ADMIN", "USER"] },
                        },
                        },
                        sessionId: { type: "string" },
                    },
                    },
                    example: {
                    user: { id: "1", email: "test@example.com", role: "ADMIN" },
                    sessionId: "sess_abc123",
                    },
                },
                },
            },
            401: { description: "Credenciales inválidas o sesión expirada" },
            },
        },
        get: {
            summary: "Obtener sesión actual",
            description: "Devuelve la sesión activa del usuario autenticado.",
            responses: {
            200: {
                description: "Sesión activa",
                content: {
                "application/json": {
                    schema: {
                    type: "object",
                    properties: {
                        user: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            email: { type: "string" },
                            role: { type: "string" },
                        },
                        },
                        sessionId: { type: "string" },
                    },
                    },
                    example: {
                    user: { id: "1", email: "test@example.com", role: "ADMIN" },
                    sessionId: "sess_abc123",
                    },
                },
                },
            },
            401: { description: "No autenticado" },
            },
        },
        delete: {
            summary: "Cerrar sesión",
            description: "Finaliza la sesión actual del usuario.",
            responses: {
            204: { description: "Sesión cerrada correctamente" },
            401: { description: "No autenticado" },
            },
        },
        },


      // ✅ Dashboard
      "/api/movements": {
        get: {
          summary: "Obtener movimientos del dashboard",
          description: "Devuelve los movimientos financieros visibles en el dashboard.",
          responses: {
            200: {
              description: "Lista de movimientos",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        concept: { type: "string" },
                        amount: { type: "number" },
                        type: { type: "string", enum: ["INCOME", "EXPENSE"] },
                        date: { type: "string", format: "date-time" },
                      },
                    },
                  },
                  example: [
                    {
                      id: "1",
                      concept: "Pago",
                      amount: 100,
                      type: "INCOME",
                      date: "2026-02-23T12:00:00Z",
                    },
                    {
                      id: "2",
                      concept: "Compra",
                      amount: 50,
                      type: "EXPENSE",
                      date: "2026-02-23T15:00:00Z",
                    },
                  ],
                },
              },
            },
            401: { description: "No autenticado" },
            403: { description: "Acceso denegado por rol" },
          },
        },
      },

      // ✅ Usuarios
      "/api/users": {
        get: {
          summary: "Listar usuarios",
          description: "Devuelve todos los usuarios registrados con sus roles.",
          responses: {
            200: {
              description: "Lista de usuarios",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        email: { type: "string" },
                        role: { type: "string", enum: ["ADMIN", "USER"] },
                      },
                    },
                  },
                  example: [
                    { id: "1", email: "admin@example.com", role: "ADMIN" },
                    { id: "2", email: "user@example.com", role: "USER" },
                  ],
                },
              },
            },
            401: { description: "No autenticado" },
            403: { description: "Acceso denegado por rol" },
          },
        },
    },
    },
  },
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(swaggerSpec);
}