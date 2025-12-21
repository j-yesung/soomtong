import { useRouter } from "next/navigation";

import { Button, Card, Column, Heading, Row, Skeleton } from "@/components/ui";
import { useFixedExpenseTableQuery } from "@/features/common/queries";
import { FixedExpenseDonutChart, FixedExpenseReport } from "@/features/dashboard/main/components";

export default function FixedExpenseBoardScreen() {
  const router = useRouter();
  const { data, isFetched } = useFixedExpenseTableQuery();

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
          <Button onClick={() => router.push("/expense")}>추가하기</Button>
        </Column>
      </Card>
    );
  }

  return (
    <>
      {isFetched ? (
        <Card direction="column" gap={12}>
          <Row pvh={[0, 16]}>
            <Heading level={2} fontWeight="bold">
              고정지출
            </Heading>
          </Row>
          <Row justify="space-between" gap={12} pvh={[0, 16]}>
            <FixedExpenseReport data={data} />
            <FixedExpenseDonutChart data={data} />
          </Row>
          <Card.Footer onClick={() => router.push("/dashboard/fixed")}>자세히 보기</Card.Footer>
        </Card>
      ) : (
        <Skeleton height={275} />
      )}
    </>
  );
}
