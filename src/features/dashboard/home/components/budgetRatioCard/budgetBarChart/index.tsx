import { memo } from "react";

import { AmountSummary } from "@/features/common/types";
import { BarChart, Box } from "@/shared/ui";

type BudgetBarChartProps = {
  data: AmountSummary | null;
};

function BudgetBarChart({ data }: BudgetBarChartProps) {
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

export default memo(BudgetBarChart);
