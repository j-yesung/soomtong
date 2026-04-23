"use client";

import { Suspense } from "react";

import { useUserStore } from "@/features/auth/store";
import { useAmountSummaryQuery, useFixedExpenseTableQuery } from "@/features/common/queries";
import { useDashboardTabStore } from "@/features/dashboard/home/store";
import BottomNavigation from "@/shared/layout/bottomNavigation";
import useMinimumVisible from "@/shared/model/useMinimumVisible";
import { Column } from "@/shared/ui";

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const activeTab = useDashboardTabStore((state) => state.activeTab);
  const userId = useUserStore((state) => state.userId);
  const isAuthReady = useUserStore((state) => state.isReady);
  const amountQuery = useAmountSummaryQuery(userId);
  const fixedQuery = useFixedExpenseTableQuery(userId);

  const isHomeLoading = !isAuthReady || !userId || !amountQuery.isFetched || !fixedQuery.isFetched;
  const showHomeLoading = useMinimumVisible(activeTab === "home" && isHomeLoading);

  return (
    <>
      <Column flex={1}>{children}</Column>
      {!showHomeLoading && (
        <Suspense fallback={null}>
          <BottomNavigation />
        </Suspense>
      )}
    </>
  );
}
