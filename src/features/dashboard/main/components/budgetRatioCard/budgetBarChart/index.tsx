import { BarChart, Box } from "@/components/ui";
import { AmountSummary } from "@/features/expense/types";

type Props = {
  data: AmountSummary | null;
};

export default function BudgetBarChart({ data }: Props) {
  if (!data) return null;

  const amountAvailable = data?.amountAvailable;
  const totalVariableExpense = data?.totalVariable;

  const ratio = amountAvailable > 0 ? Math.min((totalVariableExpense / amountAvailable) * 100, 100) : 0;

  return (
    <Box pvh={[0, 16]}>
      <BarChart
        current={amountAvailable}
        max={totalVariableExpense}
        LegendItems={[
          { label: "사용 금액", value: totalVariableExpense, color: ratio > 80 ? "danger" : "primary" },
          { label: "총 생활비", value: amountAvailable, color: "secondary" },
        ]}
      />
    </Box>
  );
}
