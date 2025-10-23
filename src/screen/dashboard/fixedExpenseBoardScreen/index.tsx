import dynamic from "next/dynamic";

import { Box, Heading, Row, Skeleton } from "@/components/ui";
import { Card } from "@/components/ui/card";
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
      <Box pvh={[0, 16]}>
        <Heading level={2} fontWeight="bold">
          고정지출
        </Heading>
      </Box>
      <Row justify="space-between" gap={12} pvh={[0, 16]}>
        <FixedExpenseReport />
        <FixedExpenseDonutChart />
      </Row>
      <Card.Footer>자세히 보기</Card.Footer>
    </Card>
  );
}
