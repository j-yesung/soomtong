import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data } = await (await supabase).auth.getClaims();
  const user = data?.claims;
  redirect(user ? "/dashboard" : "/login");
}
