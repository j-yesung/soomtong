import { DonutChart } from "@/components/ui";
import { useFixedExpenseTableQuery } from "@/features/common/queries";

export default function FixedExpenseDonutChart() {
  const { data } = useFixedExpenseTableQuery();
  const ratio = data ? (data?.totalFixedExpense / data?.budget) * 100 : 0;

  return <DonutChart value={ratio} />;
}
