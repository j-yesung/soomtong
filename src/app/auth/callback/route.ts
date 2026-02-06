import { NextResponse } from "next/server";

import { createClient } from "@/shared/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  const supabase = await createClient();

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.redirect(`${origin}/login?error=auth_code_error`);
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!userError && user) {
    const { error: upsertError } = await supabase.from("user_profile").upsert(
      {
        user_id: user.id,
        email: user.email,
      },
      { onConflict: "user_id" },
    );

    if (upsertError) {
      console.error("[user_profile upsert error]", upsertError);
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
