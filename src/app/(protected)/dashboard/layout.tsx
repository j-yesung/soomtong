import { Suspense } from "react";

import DashboardHeader from "@/shared/layout/dashboardHeader";
import { Column } from "@/shared/ui";

import DashboardClientLayout from "./dashboardClientLayout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Column gap={24} height="calc(100svh - 125px)">
      <Suspense fallback={null}>
        <DashboardHeader />
      </Suspense>
      <DashboardClientLayout>{children}</DashboardClientLayout>
    </Column>
  );
}
