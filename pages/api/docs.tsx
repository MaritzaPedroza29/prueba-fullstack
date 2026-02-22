import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Docs",
      version: "1.0.0",
    },
  },
  apis: ["./pages/api/*.ts"], // rutas a documentar
};

const specs = swaggerJsdoc(options);

export default function ApiDocs() {
  return <SwaggerUI spec={specs} />;
}
