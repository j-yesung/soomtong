import StoreHydrator from "@/app/(protected)/store-hydrator";
import { getServerSupabaseRSC } from "@/lib/supabase/server-rsc";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await getServerSupabaseRSC();

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
