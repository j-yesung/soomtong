import { redirect } from "next/navigation";

export default async function Home() {
  // const supabase = await createClient();

  // const { data: route, error } = await supabase.rpc("get_home_route");
  // if (error || !route) redirect("/login");

  redirect("/dashboard");
}
