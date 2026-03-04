import { Suspense } from "react";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import BottomNavigation from "@/shared/layout/bottomNavigation";
import DashboardHeader from "@/shared/layout/dashboardHeader";
import { getServerUser } from "@/shared/lib/auth/get-server-user";
import { Column } from "@/shared/ui";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser();
  const headerList = await headers();
  const currentPath = headerList.get("x-pathname") ?? "/dashboard";

  if (!user?.id) {
    const next = currentPath.startsWith("/") ? currentPath : "/dashboard";
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }

  return (
    <>
      <Column gap={24} height="calc(100svh - 125px)">
        <Suspense fallback={null}>
          <DashboardHeader />
        </Suspense>
        {children}
      </Column>
      <Suspense fallback={null}>
        <BottomNavigation />
      </Suspense>
    </>
  );
}
