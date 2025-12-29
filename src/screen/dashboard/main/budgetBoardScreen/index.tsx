import { useRouter } from "next/navigation";

import { Button, Card, Column, Heading, Skeleton, Text } from "@/components/ui";
import { useAmountSummaryQuery } from "@/features/common/queries";
import { BudgetBarChart, BudgetReport } from "@/features/dashboard/main/components";

export default function BudgetBoardScreen() {
  const { data, isFetched } = useAmountSummaryQuery();
  const router = useRouter();

  if (isFetched && !data?.amountAvailable) {
    return (
      <Card direction="column">
        <Column gap={32} pvh={[0, 16]}>
          <Column as="header">
            <Heading level={2} fontWeight="bold">
              월수입을 입력해 주세요
            </Heading>
            <Heading level={5} fontWeight="normal" color="secondary">
              월수입을 기반으로 생활비를 계획해 보세요
            </Heading>
          </Column>
          <Button onClick={() => router.push("/salary")}>추가하기</Button>
        </Column>
      </Card>
    );
  }

  return (
    <>
      {isFetched ? (
        <Card direction="column" gap={16}>
          <BudgetReport data={data} />
          <BudgetBarChart data={data} />
          <Card.Footer>
            <button type="button" onClick={() => {}}>
              <Text className="inner" size={14} color="inverseWhite">
                월수입 변경
              </Text>
            </button>
            <button type="button" onClick={() => router.push("/dashboard/expense")}>
              <Text size={14} color="inverseWhite">
                지출내역 보기
              </Text>
            </button>
          </Card.Footer>
        </Card>
      ) : (
        <Skeleton height={181.39} />
      )}
    </>
  );
}
