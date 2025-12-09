import { redirect } from "next/navigation";

import { FixedRow } from "@/features/expense/types";
import { getServerSupabaseAction } from "@/lib/supabase/server-action";

export default async function Home() {
  const supabase = await getServerSupabaseAction();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data, error } = await supabase
    .from("fixed_expenses")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle<FixedRow>();

  if (error) {
    console.error("fixed_expenses error: ", error);
    return redirect("/salary");
  }

  if (!data) {
    return redirect("/salary");
  }

  const budget = data.budget;
  const itemsCount = data.items?.length ?? 0;

  const next = budget ? (itemsCount > 0 ? "/dashboard" : "/expense") : "/salary";

  return redirect(next);
}
