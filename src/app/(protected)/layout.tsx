import { redirect } from "next/navigation";

import StoreHydrator from "@/app/(protected)/store-hydrator";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) redirect("/login");

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      {session?.user ? <StoreHydrator user={session.user} /> : null}
      {children}
    </>
  );
}
