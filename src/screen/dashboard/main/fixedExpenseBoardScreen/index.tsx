import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { Card, Heading, Row, Skeleton } from "@/components/ui";
import { FixedExpenseReportSkeleton } from "@/features/dashboard/main/components";

const FixedExpenseReport = dynamic(
  () => import("@/features/dashboard/main/components/fixedExpenseCard/fixedExpenseReport"),
  {
    ssr: false,
    loading: () => <FixedExpenseReportSkeleton />,
  },
);

const FixedExpenseDonutChart = dynamic(
  () => import("@/features/dashboard/main/components/fixedExpenseCard/fixedExpenseDonutChart"),
  {
    ssr: false,
    loading: () => <Skeleton width={128} height={128} />,
  },
);

export default function FixedExpenseBoardScreen() {
  const router = useRouter();

  return (
    <Card direction="column" gap={12}>
      <Row pvh={[0, 16]}>
        <Heading level={2} fontWeight="bold">
          고정지출
        </Heading>
      </Row>
      <Row justify="space-between" gap={12} pvh={[0, 16]}>
        <FixedExpenseReport />
        <FixedExpenseDonutChart />
      </Row>
      <Card.Footer onClick={() => router.push("/dashboard/fixed")}>자세히 보기</Card.Footer>
    </Card>
  );
}
