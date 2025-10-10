import { NextRequest, NextResponse } from "next/server";

import { createSupabaseWithCookies } from "@/lib/supabase/factory";

const PUBLIC = ["/", "/login"];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createSupabaseWithCookies({
    getAll: () => req.cookies.getAll(),
    setAll: (list) => {
      list.forEach(({ name, value, options }) => res.cookies.set({ name, value, ...options }));
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { pathname } = req.nextUrl;

  if (pathname === "/login" && session) return NextResponse.redirect(new URL("/", req.url));
  if (!PUBLIC.includes(pathname) && !session) return NextResponse.redirect(new URL("/login", req.url));

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|images).*)"],
};
