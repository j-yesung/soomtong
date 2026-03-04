import { redirect } from "next/navigation";

import { getServerUser } from "@/shared/lib/auth/get-server-user";

import UserStoreHydrator from "./user-store-hydrator";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser();

  if (!user?.id) {
    redirect("/login?next=/dashboard");
  }

  return <UserStoreHydrator user={user}>{children}</UserStoreHydrator>;
}
