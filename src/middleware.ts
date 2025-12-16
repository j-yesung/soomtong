import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

function hasSupabaseCookie(req: NextRequest) {
  return req.cookies.getAll().some((c) => c.name.startsWith("sb-") && !!c.value);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublicRoute = pathname === "/login" || pathname.startsWith("/auth");

  const hasCookie = hasSupabaseCookie(req);
  if (!hasCookie) {
    if (isPublicRoute) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let response = NextResponse.next({ request: { headers: req.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          response = NextResponse.next({ request: { headers: req.headers } });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return response;
}
