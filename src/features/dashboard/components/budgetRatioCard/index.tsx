import { BarChart, Card, Column, Heading, Text } from "@/components/ui";
import { useFixedExpenseTableQuery } from "@/features/common/queries";

export default function BudgetRatioCard() {
  const { data } = useFixedExpenseTableQuery();

  const income = data?.budget;
  const totalExpense = data?.items?.reduce((acc, cur) => acc + cur.amount, 0) ?? 0;
  const livingExpense = income - totalExpense;

  return (
    <Card isDirection="column" gap={12}>
      <Heading level={3} fontWeight="bold">
        이번달 생활비는
        <br />
        {livingExpense.toLocaleString()}원이에요
      </Heading>
      <Column gap={4}>
        <Text size={12} color="secondary">
          월수입 {income?.toLocaleString()}원 / 고정지출 {totalExpense?.toLocaleString()}원
        </Text>
        <BarChart income={income} expense={totalExpense} />
      </Column>
    </Card>
  );
}
