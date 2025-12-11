import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const headerList = await headers();
  const userId = headerList.get("x-user-id");

  if (!userId) {
    redirect("/login");
  }

  const supabase = await createClient();

  const { data } = await supabase.from("fixed_expenses").select("budget, items").eq("user_id", userId).maybeSingle();

  if (!data || !data.budget) {
    redirect("/salary");
  }

  const hasItems = Array.isArray(data.items) && data.items.length > 0;

  if (!hasItems) {
    redirect("/expense");
  }

  redirect("/dashboard");
}
