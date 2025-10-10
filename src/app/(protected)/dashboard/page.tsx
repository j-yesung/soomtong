"use client";

import { Column } from "@/components/ui";
import BudgetRatioCard from "@/features/dashboard/components/budgetRatioCard";

export default function DashboardPage() {
  return (
    <Column>
      <BudgetRatioCard />
    </Column>
  );
}
