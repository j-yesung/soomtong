import { redirect } from "next/navigation";

import { getServerUser } from "@/shared/lib/auth/get-server-user";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser();

  if (!user?.id) {
    redirect("/login?next=/dashboard");
  }

  return <>{children}</>;
}
