import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getServerUser } from "@/shared/lib/auth/get-server-user";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser();
  const headerList = await headers();
  const currentPath = headerList.get("x-pathname") ?? "/dashboard";

  if (!user?.id) {
    const next = currentPath.startsWith("/") ? currentPath : "/dashboard";
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  return <>{children}</>;
}
