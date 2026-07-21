import { memo } from "react";

import { AmountSummary } from "@/features/common/types";
import { BarChart, Box } from "@/shared/ui";

type BudgetBarChartProps = {
  data: AmountSummary | null;
};

function BudgetBarChart({ data }: BudgetBarChartProps) {
  if (!data) return null;

  const budget = data.budget;
  const fixedTotal = data.fixedTotal;

  const ratio = budget > 0 ? Math.min((fixedTotal / budget) * 100, 100) : 0;

  return (
    <Box pvh={[0, 16]}>
      <BarChart
        current={budget}
        max={fixedTotal}
        LegendItems={[
          { label: "고정지출", value: fixedTotal, color: ratio >= 80 ? "danger" : "primary" },
          { label: "월수입", value: budget, color: "secondary" },
        ]}
      />
    </Box>
  );
}

export default memo(BudgetBarChart);
