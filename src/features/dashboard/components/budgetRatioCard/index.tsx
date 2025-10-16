import { BarChart, Card, Column, Row, Text } from "@/components/ui";
import { useFixedExpenseTableQuery } from "@/features/common/queries";

export default function BudgetRatioCard() {
  const { data } = useFixedExpenseTableQuery();

  const income = data?.budget;
  const totalExpense = data?.items?.reduce((acc, cur) => acc + cur.amount, 0) ?? 0;
  const livingExpense = income - totalExpense;

  return (
    <Card isDirection="column" gap={12}>
      <Column gap={4}>
        <Text variant="caption" weight={500}>
          이번달 생활비는
        </Text>
        <Row gap={6}>
          <Text size={22} weight={700} color="blue">
            {livingExpense.toLocaleString()}원
          </Text>
          <Text size={22} weight={700}>
            사용 가능해요
          </Text>
        </Row>
      </Column>
      <Column gap={4}>
        <Text size={12} color="secondary">
          월수입 {income?.toLocaleString()}원 / 고정지출 {totalExpense?.toLocaleString()}원
        </Text>
        <BarChart income={income} expense={totalExpense} />
      </Column>
    </Card>
  );
}
