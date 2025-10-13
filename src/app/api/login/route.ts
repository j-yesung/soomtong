import { NextResponse } from "next/server";

import { getServerSupabaseAction } from "@/lib/supabase/server-action";

export const runtime = "nodejs";

export async function POST() {
  const supabase = await getServerSupabaseAction();

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const payload = { user_id: user.id, email: user.email };

  const { error: upsertErr } = await supabase
    .from("user_profile")
    .upsert(payload, { onConflict: "user_id" })
    .select()
    .single();

  if (upsertErr) {
    return NextResponse.json({ ok: false, error: upsertErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
