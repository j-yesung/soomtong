import { Suspense } from "react";

import BottomNavigation from "@/components/layout/bottomNavigation";
import DashboardHeader from "@/components/layout/dashboardHeader";
import { Column } from "@/components/ui";

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
