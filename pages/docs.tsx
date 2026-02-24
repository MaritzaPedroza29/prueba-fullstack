"use client";

import dynamic from "next/dynamic";

// Importar SwaggerUI de forma dinámica.
// - ssr: false → desactiva el renderizado en servidor (SSR),
//   porque SwaggerUI depende de objetos del navegador (window, document).
const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

// Página de documentación de la API.
// Renderiza la interfaz de Swagger UI apuntando al endpoint /api/docs.
export default function ApiDocsPage() {
  // SwaggerUI recibe la URL del archivo OpenAPI/Swagger generado por el backend.
  // Esto permite visualizar y probar los endpoints directamente desde el navegador.
  return <SwaggerUI url="/api/docs" />;
}