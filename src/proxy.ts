// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Obtener el token de las cookies
  const token = request.cookies.get("token")?.value;

  // Verificar si estamos en la home page
  const isHomePage = request.nextUrl.pathname === "/";

  // Si está en la home y no hay token, redirigir al login
  if (isHomePage && !token) {
    // Redirigir a la página de login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Permitir la solicitud si hay token o no es la home
  return NextResponse.next();
}

// Configurar qué rutas deben pasar por el proxy
export const config = {
  matcher: "/", // Solo aplica a la home page
};
