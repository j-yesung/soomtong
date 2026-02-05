import { Suspense } from "react";

import BottomNavigation from "@/shared/layout/bottomNavigation";
import DashboardHeader from "@/shared/layout/dashboardHeader";
import { Column } from "@/shared/ui";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Column gap={24}>
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
