import { BarChart } from "@/components/ui";
import { useFixedExpenseTableQuery } from "@/features/common/queries";

export default function BudgetBarChart() {
  const { data } = useFixedExpenseTableQuery();

  const income = data?.budget;
  const totalFixedExpense = data?.totalFixedExpense;

  return (
    <>
      {data && (
        <BarChart
          income={income}
          expense={totalFixedExpense}
          LegendItems={[
            { label: "월수입", value: income, color: "primary" },
            { label: "고정지출", value: totalFixedExpense, color: "secondary" },
          ]}
        />
      )}
    </>
  );
}
