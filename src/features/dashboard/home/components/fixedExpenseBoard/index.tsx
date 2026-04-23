import { useUserStore } from "@/features/auth/store";
import { useFixedExpenseTableQuery } from "@/features/common/queries";
import { FixedExpenseDonutChart, FixedExpenseReport } from "@/features/dashboard/home/components";
import { useDashboardTabStore } from "@/features/dashboard/home/store";
import { navigateToDashboardTab } from "@/shared/lib/navigation/dashboard";
import { Button, Card, Column, Heading, Row } from "@/shared/ui";

export default function FixedExpenseBoard() {
  const userId = useUserStore((state) => state.userId);
  const { data } = useFixedExpenseTableQuery(userId);

  const setActiveTab = useDashboardTabStore((state) => state.setActiveTab);

  if (!data || !data?.totalFixedExpense) {
    return (
      <Card direction="column" gap={32}>
        <Column gap={32} pvh={[0, 16]}>
          <Column>
            <Heading level={2} fontWeight="bold">
              고정지출
            </Heading>
            <Heading level={5} fontWeight="normal" color="secondary">
              월수입을 입력한 뒤 설정할 수 있고
              <br />
              사용 금액 계산이 더 정확해져요
            </Heading>
          </Column>
          <Button
            onClick={() => {
              setActiveTab("fixed");
              navigateToDashboardTab("fixed");
            }}
          >
            추가하기
          </Button>
        </Column>
      </Card>
    );
  }

  return (
    <Card direction="column" gap={12}>
      <Row pvh={[0, 16]}>
        <Heading level={2} fontWeight="bold">
          고정지출
        </Heading>
      </Row>
      <Row justify="space-between" gap={12} pvh={[0, 16]}>
        <FixedExpenseReport data={data!} />
        <FixedExpenseDonutChart data={data!} />
      </Row>
    </Card>
  );
}
