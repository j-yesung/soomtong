import { type NextRequest } from "next/server";

import { updateSession } from "@/shared/lib/supabase/proxy";

export async function middleware(req: NextRequest) {
  return updateSession(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/data|favicon.ico|manifest.json|.*\\.webmanifest|sw.js|workbox-.*|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|woff2?|ttf|otf)$).*)",
  ],
};
