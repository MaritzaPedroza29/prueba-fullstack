"use client";

import "@/styles/globals.css";
import Providers from "./providers";
import { usePathname } from "next/navigation";
import {AppSidebar} from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  return (
    <html lang="es">
      <body>
        <Providers>
          {!isLoginPage && <AppSidebar />}
          <main className="flex-1">
            {!isLoginPage && <AppHeader />}
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}