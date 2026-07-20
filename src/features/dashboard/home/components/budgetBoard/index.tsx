import { useRouter } from "next/navigation";

import { useUserStore } from "@/features/auth/store";
import { useAmountSummaryQuery } from "@/features/common/queries";
import { BudgetBarChart, BudgetReport } from "@/features/dashboard/home/components";
import { Button, Card, Column, Heading, Text } from "@/shared/ui";

export default function BudgetBoard() {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);

  const { data } = useAmountSummaryQuery(userId);

  const hasBudget = !!data?.budget;

  return (
    <>
      <Card direction="column" gap={16}>
        {hasBudget ? (
          <>
            <BudgetReport data={data} />
            <BudgetBarChart data={data} />
            <Card.Footer>
              <button type="button" onClick={() => router.push("/dashboard/budget")}>
                <Text className="inner" size={14} color="inverseWhite">
                  월수입 변경
                </Text>
              </button>
              <button type="button" onClick={() => router.push("/dashboard/expense/new")}>
                <Text size={14} color="inverseWhite">
                  지출 추가
                </Text>
              </button>
            </Card.Footer>
          </>
        ) : (
          <Column gap={32} pvh={[0, 16]}>
            <Column as="header">
              <Heading level={2} fontWeight="bold">
                월수입을 입력해 주세요
              </Heading>
              <Heading level={5} fontWeight="normal" color="secondary">
                월수입을 기반으로 생활비를 계획해 보세요
              </Heading>
            </Column>
            <Button onClick={() => router.push("/dashboard/budget")}>추가하기</Button>
          </Column>
        )}
      </Card>
    </>
  );
}
