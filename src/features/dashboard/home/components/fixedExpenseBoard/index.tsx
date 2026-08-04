import { useRouter } from "next/navigation";

import { useUserStore } from "@/features/auth/store";
import { useAmountSummaryQuery, useFixedExpenseTableQuery } from "@/features/common/queries";
import { FixedExpense } from "@/features/common/types";
import { FixedExpenseDonutChart, FixedExpenseReport } from "@/features/dashboard/home/components";
import { Button, Card, Column, Heading, Row, Text } from "@/shared/ui";

function getLargestFixedExpenseCategory(items: FixedExpense[]) {
  const totals = new Map<string, number>();

  items.forEach(({ tag, amount }) => totals.set(tag, (totals.get(tag) ?? 0) + amount));

  return Array.from(totals, ([tag, amount]) => ({ tag, amount })).reduce<FixedExpense | null>(
    (largest, current) => (!largest || current.amount > largest.amount ? current : largest),
    null,
  );
}

export default function FixedExpenseBoard() {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const { data } = useFixedExpenseTableQuery(userId);
  const { data: amountSummary } = useAmountSummaryQuery(userId);

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
          <Button onClick={() => router.push("/dashboard/fixed/new")}>추가하기</Button>
        </Column>
      </Card>
    );
  }

  const largestCategory = getLargestFixedExpenseCategory(data.items);

  return (
    <Card direction="column" gap={12} flushBottom>
      <Row pvh={[0, 16]}>
        <Heading level={2} fontWeight="bold">
          고정지출
        </Heading>
      </Row>
      <Row justify="space-between" gap={12} pvh={[0, 16]}>
        <FixedExpenseReport data={data!} />
        <FixedExpenseDonutChart budget={amountSummary?.budget ?? 0} totalFixed={data.totalFixedExpense} />
      </Row>
      {largestCategory && (
        <Row
          justify="space-between"
          align="center"
          gap={12}
          pvh={[12, 16]}
          borderBottomLeftRadius="inherit"
          borderBottomRightRadius="inherit"
          backgroundColor="var(--color-secondary)"
        >
          <Text size={13} color="secondary">
            가장 큰 지출
          </Text>
          <Text size={14} weight={700} align="right">
            {largestCategory.tag} · {largestCategory.amount.toLocaleString()}원
          </Text>
        </Row>
      )}
    </Card>
  );
}
