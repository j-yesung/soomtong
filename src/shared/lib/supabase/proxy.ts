import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  const hasSupabaseCookie = request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb-") || cookie.name.startsWith("supabase-"));

  const pathname = request.nextUrl.pathname;
  const isPublicRoute = pathname === "/login" || pathname.startsWith("/auth") || pathname === "/prompt-information";
  const isProtectedRoute = !isPublicRoute;

  if (!hasSupabaseCookie && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    const nextPath = `${pathname}${request.nextUrl.search}`;
    url.searchParams.set("next", nextPath);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
