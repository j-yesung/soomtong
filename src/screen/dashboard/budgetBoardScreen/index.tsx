import dynamic from "next/dynamic";

import { Card, Skeleton } from "@/components/ui";

const BudgetReport = dynamic(() => import("@/features/dashboard/components/budgetRatioCard/budgetReport"), {
  ssr: false,
  loading: () => <Skeleton height={59.4} />,
});

const BudgetBarChart = dynamic(() => import("@/features/dashboard/components/budgetRatioCard/budgetBarChart"), {
  ssr: false,
  loading: () => <Skeleton height={78} />,
});

export default function BudgetBoardScreen() {
  return (
    <Card direction="column" gap={12}>
      <BudgetReport />
      <BudgetBarChart />
    </Card>
  );
}
