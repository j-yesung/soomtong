import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase.from("fixed_expenses").select("budget, items").eq("user_id", user.id).maybeSingle();

  if (!data || !data.budget) {
    redirect("/salary");
  }

  const hasItems = Array.isArray(data.items) && data.items.length > 0;

  if (!hasItems) {
    redirect("/expense");
  }

  redirect("/dashboard");
}
