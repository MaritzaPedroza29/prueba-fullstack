"use client";

import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });
export default function ApiDocsPage() {
  return <SwaggerUI url="/api/docs" />;
}