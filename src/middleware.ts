import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Supabase 인증 쿠키 확인
  const hasAuthCookie = req.cookies.getAll().some((cookie) => cookie.name.startsWith("sb-") && cookie.value);

  // 로그인 상태면 로그인 페이지 진입 차단
  if (pathname === "/login" && hasAuthCookie) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const isPublic = PUBLIC_ROUTES.includes(pathname);

  if (isPublic) {
    return NextResponse.next();
  }

  if (!hasAuthCookie) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // 정적 리소스 등은 미들웨어에서 제외
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|images).*)"],
};
