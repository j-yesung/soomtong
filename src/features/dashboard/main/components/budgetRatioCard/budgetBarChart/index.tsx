import { useMemo } from "react";

import { BarChart, Box } from "@/components/ui";
import { useAmountSummaryQuery } from "@/features/common/queries";

export default function BudgetBarChart() {
  const { data } = useAmountSummaryQuery();

  const amountAvailable = data?.amountAvailable ?? 0;
  const totalVariableExpense = data?.totalVariable ?? 0;

  const ratio = useMemo(
    () => (amountAvailable > 0 ? Math.min((totalVariableExpense / amountAvailable) * 100, 100) : 0),
    [amountAvailable, totalVariableExpense],
  );

  return (
    <>
      {data && (
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
      )}
    </>
  );
}
