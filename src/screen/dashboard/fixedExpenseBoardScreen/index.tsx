import dynamic from "next/dynamic";

import { Card, Heading, Row, Skeleton } from "@/components/ui";
import { FixedExpenseReportSkeleton } from "@/features/dashboard/components";

const FixedExpenseReport = dynamic(
  () => import("@/features/dashboard/components/fixedExpenseCard/fixedExpenseReport"),
  {
    ssr: false,
    loading: () => <FixedExpenseReportSkeleton />,
  },
);

const FixedExpenseDonutChart = dynamic(
  () => import("@/features/dashboard/components/fixedExpenseCard/fixedExpenseDonutChart"),
  {
    ssr: false,
    loading: () => <Skeleton width={128} height={128} />,
  },
);

export default function FixedExpenseBoardScreen() {
  return (
    <Card direction="column" gap={12}>
      <Heading level={2} fontWeight="bold">
        고정지출
      </Heading>
      <Row justify="space-between" gap={12}>
        <FixedExpenseReport />
        <FixedExpenseDonutChart />
      </Row>
      <div>월수입 대비 41%</div>
    </Card>
  );
}
