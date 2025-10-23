import { BarChart, Box } from "@/components/ui";
import { useFixedExpenseTableQuery } from "@/features/common/queries";

export default function BudgetBarChart() {
  const { data } = useFixedExpenseTableQuery();

  const amountAvailable = data?.amountAvailable;

  return (
    <>
      {data && (
        <Box pvh={[0, 16]}>
          <BarChart
            current={data?.amountAvailable}
            max={20000000}
            LegendItems={[
              { label: "사용 금액", value: 20000000, color: "primary" },
              { label: "총 생활비", value: amountAvailable, color: "secondary" },
            ]}
          />
        </Box>
      )}
    </>
  );
}
