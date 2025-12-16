import { redirect } from "next/navigation";

import StoreHydrator from "@/app/(protected)/store-hydrator";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;
  if (!user) redirect("/login");

  return (
    <>
      <StoreHydrator user={user} />
      {children}
    </>
  );
}
