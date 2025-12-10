import StoreHydrator from "@/app/(protected)/store-hydrator";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {session ? <StoreHydrator user={user!} /> : null}
      {children}
    </>
  );
}
