import { Column, Row, Text } from "@/components/ui";
import { SlotCounter } from "@/features/common/components";
import { useAmountSummaryQuery } from "@/features/common/queries";

export default function BudgetReport() {
  const { data } = useAmountSummaryQuery();

  return (
    <>
      {data && (
        <Column gap={4} pvh={[0, 16]}>
          <Text variant="caption" weight={500}>
            이번달 생활비는
          </Text>
          <Row gap={6} align="center">
            <SlotCounter value={data?.amountAvailable} suffix="원" color="blue" fontSize={22} />
            <Text size={22} weight={700}>
              사용 가능해요
            </Text>
          </Row>
        </Column>
      )}
    </>
  );
}
