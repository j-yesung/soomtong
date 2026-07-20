"use client";

import { Suspense } from "react";

import { usePathname } from "next/navigation";

import { useUserStore } from "@/features/auth/store";
import { useAmountSummaryQuery, useFixedExpenseTableQuery } from "@/features/common/queries";
import { useDashboardTabStore } from "@/features/dashboard/home/store";
import BottomNavigation from "@/shared/layout/bottomNavigation";
import DashboardHeader from "@/shared/layout/dashboardHeader";
import { isDashboardFormPath } from "@/shared/lib/navigation/dashboard";
import useMinimumVisible from "@/shared/model/useMinimumVisible";
import { Column } from "@/shared/ui";

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeTab = useDashboardTabStore((state) => state.activeTab);
  const userId = useUserStore((state) => state.userId);
  const isAuthReady = useUserStore((state) => state.isReady);
  const amountQuery = useAmountSummaryQuery(userId);
  const fixedQuery = useFixedExpenseTableQuery(userId);

  const isHomeLoading = !isAuthReady || !userId || !amountQuery.isFetched || !fixedQuery.isFetched;
  const showHomeLoading = useMinimumVisible(activeTab === "home" && isHomeLoading);
  const isFormScreen = isDashboardFormPath(pathname);

  return (
    <Column gap={isFormScreen ? 0 : 24} height={isFormScreen ? "100svh" : "calc(100svh - 97px)"}>
      {!isFormScreen && (
        <Suspense fallback={null}>
          <DashboardHeader />
        </Suspense>
      )}
      <Column flex={1} minHeight={0}>
        {children}
      </Column>
      {!isFormScreen && !showHomeLoading && (
        <Suspense fallback={null}>
          <BottomNavigation />
        </Suspense>
      )}
    </Column>
  );
}
