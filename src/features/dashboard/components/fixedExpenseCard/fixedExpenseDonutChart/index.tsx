import { DonutChart } from "@/components/ui";
import { useFixedExpenseTableQuery } from "@/features/common/queries";

export default function FixedExpenseDonutChart() {
  const { data } = useFixedExpenseTableQuery();
  return <DonutChart value={41} />;
}
