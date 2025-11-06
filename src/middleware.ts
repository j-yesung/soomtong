import { NextRequest, NextResponse } from "next/server";

const PUBLIC = ["/login"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasAuthCookie =
    req.cookies.has("sb-access-token") ||
    req.cookies.has("sb-refresh-token") ||
    req.cookies.getAll().some((c) => c.name.startsWith("sb-") && !!c.value);

  if (pathname === "/login" && hasAuthCookie) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const isPublic = PUBLIC.includes(pathname);

  if (!isPublic && !hasAuthCookie) {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|images|auth).*)"],
};
