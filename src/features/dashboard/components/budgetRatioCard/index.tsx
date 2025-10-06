import { BarChart, Card, Column, Heading, Text } from "@/components/ui";

export default function BudgetRatioCard() {
  const income = 3000000;
  const expense = 1912000;
  const livingExpense = income - expense;

  return (
    <Card isDirection="column" gap={12}>
      <Heading level={3} fontWeight="bold">
        이번달 생활비는
        <br />
        {livingExpense.toLocaleString()}원이에요
      </Heading>
      <Column gap={4}>
        <Text size={12} color="secondary">
          월수입 {income?.toLocaleString()}원 / 고정지출 {expense?.toLocaleString()}원
        </Text>
        <BarChart income={income} expense={expense} />
      </Column>
    </Card>
  );
}
