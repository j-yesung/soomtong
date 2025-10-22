import { Column, Row, Text } from "@/components/ui";
import { useFixedExpenseTableQuery } from "@/features/common/queries";

export default function BudgetReport() {
  const { data } = useFixedExpenseTableQuery();

  return (
    <>
      {data && (
        <Column gap={4}>
          <Text variant="caption" weight={500}>
            이번달 생활비는
          </Text>
          <Row gap={6}>
            <Text size={22} weight={700} color="blue">
              {data?.amountAvailable?.toLocaleString()}원
            </Text>
            <Text size={22} weight={700}>
              사용 가능해요
            </Text>
          </Row>
        </Column>
      )}
    </>
  );
}
