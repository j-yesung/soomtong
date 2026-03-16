import { NextResponse } from "next/server";

import { createClient } from "@/shared/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const nextPath = next.startsWith("/") && next !== "/login" ? next : "/dashboard";

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

  if (userError || !user?.id) {
    return NextResponse.redirect(`${origin}/login?error=user_not_found`);
  }

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

  const userIdLiteral = JSON.stringify(user.id);
  const nextPathLiteral = JSON.stringify(`${origin}${nextPath}`);

  const html = `
    <!doctype html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>login callback</title>
      </head>
      <body>
        <script>
          (function () {
            var userId = ${userIdLiteral};
            var destination = ${nextPathLiteral};
            try {
              localStorage.setItem("soomtong-auth-store", JSON.stringify({ state: { userId: userId }, version: 0 }));
            } catch (e) {}
            window.location.replace(destination);
          })();
        </script>
        <noscript>
          <a href="${origin}${nextPath}">계속하기</a>
        </noscript>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
