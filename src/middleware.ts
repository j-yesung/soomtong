import { type NextRequest, NextResponse } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

function hasSupabaseCookie(req: NextRequest) {
  return req.cookies.getAll().some((c) => c.name.startsWith("sb-") && !!c.value);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublic = pathname === "/login" || pathname.startsWith("/auth");

  if (!hasSupabaseCookie(req) && isPublic) return NextResponse.next();

  return updateSession(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/data|favicon.ico|manifest.json|.*\\.webmanifest|sw.js|workbox-.*|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|woff2?|ttf|otf)$).*)",
  ],
};
