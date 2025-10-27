import dynamic from "next/dynamic";

import { Card } from "@/components/ui/card";
import { BudgetBarChartSkeleton, BudgetReportSkeleton } from "@/features/dashboard/components";

const BudgetReport = dynamic(() => import("@/features/dashboard/components/budgetRatioCard/budgetReport"), {
  ssr: false,
  loading: () => <BudgetReportSkeleton />,
});

const BudgetBarChart = dynamic(() => import("@/features/dashboard/components/budgetRatioCard/budgetBarChart"), {
  ssr: false,
  loading: () => <BudgetBarChartSkeleton />,
});

export default function BudgetBoardScreen() {
  return (
    <Card direction="column" gap={12}>
      <BudgetReport />
      <BudgetBarChart />
    </Card>
  );
}
