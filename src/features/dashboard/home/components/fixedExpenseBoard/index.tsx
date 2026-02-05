import { useEffect } from "react";

import Link from "next/link";

import { Button, Card, Column, Heading, Row } from "@/shared/ui";
import { useFixedExpenseTableQuery } from "@/features/common/queries";
import { useBudgetStore } from "@/features/common/store";
import { FixedExpenseDonutChart, FixedExpenseReport } from "@/features/dashboard/home/components";

export default function FixedExpenseBoard({ userId }: { userId: string }) {
  const { data } = useFixedExpenseTableQuery(userId);

  const updateBudget = useBudgetStore((state) => state.updateBudget);

  useEffect(() => {
    if (data) {
      updateBudget({ amount: data?.budget, day: data?.day });
    }
  }, [data, updateBudget]);

  if (data?.items?.length === 0) {
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
          <Link href="/expense">
            <Button>추가하기</Button>
          </Link>
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
