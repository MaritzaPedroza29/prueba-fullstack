import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Leer cookie de sesión directamente
  const sessionCookie = req.cookies.get("better-auth.session-token");

  const isAuthApi = pathname.startsWith("/api/auth");
  const isLoginPage = pathname === "/";

  if (!sessionCookie && pathname.startsWith("/dashboard") && pathname.startsWith("/users")  && pathname.startsWith("/reports")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isLoginPage || isAuthApi) {
    return NextResponse.next();
  }

  return NextResponse.next();
}