import { BarChart, Box } from "@/components/ui";
import { useAmountSummaryQuery } from "@/features/common/queries";

export default function BudgetBarChart() {
  const { data } = useAmountSummaryQuery();

  const amountAvailable = data?.amountAvailable ?? 0;
  const totalVariableExpense = data?.totalVariable ?? 0;

  return (
    <>
      {data && (
        <Box pvh={[0, 16]}>
          <BarChart
            current={amountAvailable}
            max={totalVariableExpense}
            LegendItems={[
              { label: "사용 금액", value: totalVariableExpense, color: "primary" },
              { label: "총 생활비", value: amountAvailable, color: "secondary" },
            ]}
          />
        </Box>
      )}
    </>
  );
}
