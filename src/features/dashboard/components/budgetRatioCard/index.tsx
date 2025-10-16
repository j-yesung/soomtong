import dynamic from "next/dynamic";

import { Card, Skeleton } from "@/components/ui";

const AvailableText = dynamic(() => import("@/features/dashboard/components/budgetRatioCard/availableText"), {
  ssr: false,
  loading: () => <Skeleton height={59.4} />,
});

const BudgetBarChart = dynamic(() => import("@/features/dashboard/components/budgetRatioCard/budgetBarChart"), {
  ssr: false,
  loading: () => <Skeleton height={78} />,
});

export default function BudgetRatioCard() {
  return (
    <Card isDirection="column" gap={12}>
      <AvailableText />
      <BudgetBarChart />
    </Card>
  );
}
