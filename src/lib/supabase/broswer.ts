"use client";

import { createBrowserClient } from "@supabase/ssr";

export const supabaseBrowser = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  {
    auth: {
      persistSession: true, // 브라우저 세션 유지
      autoRefreshToken: true, // 토큰 자동 갱신
      detectSessionInUrl: true, // OAuth 리디렉션 처리
    },
  },
);
