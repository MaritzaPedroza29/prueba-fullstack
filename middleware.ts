import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware que se ejecuta en cada request.
// Sirve para proteger rutas privadas y manejar redirecciones según la sesión.
export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Leer cookie de sesión directamente (BetterAuth)
  // Esta cookie indica si el usuario está autenticado
  const sessionCookie = req.cookies.get("better-auth.session-token");

  // Flags para identificar rutas especiales
  const isAuthApi = pathname.startsWith("/api/auth"); // rutas de autenticación
  const isLoginPage = pathname === "/";               // página de login

  // Si no hay cookie de sesión y el usuario intenta acceder a rutas privadas,
  // se redirige al login.
  // ⚠️ Ojo: el condicional actual usa AND (&&), lo que significa que
  // solo se cumple si el pathname empieza al mismo tiempo por /dashboard, /users y /reports.
  if (!sessionCookie && 
    pathname.startsWith("/dashboard") && 
    pathname.startsWith("/users")  && 
    pathname.startsWith("/reports")) 
    { return NextResponse.redirect(new URL("/", req.url)); }


  // Si la ruta es la página de login o una API de auth,
  // se permite continuar sin restricciones.
  if (isLoginPage || isAuthApi) {
    return NextResponse.next();
  }

  // Para cualquier otra ruta, continuar normalmente
  return NextResponse.next();
}