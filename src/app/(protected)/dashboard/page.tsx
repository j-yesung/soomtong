"use client";

import dynamic from "next/dynamic";

import { Column, Skeleton } from "@/components/ui";

const BudgetRatioCard = dynamic(() => import("@/features/dashboard/components/budgetRatioCard"), {
  ssr: false,
  loading: () => <Skeleton height={168} />,
});

export default function DashboardPage() {
  return (
    <Column>
      <BudgetRatioCard />
    </Column>
  );
}
