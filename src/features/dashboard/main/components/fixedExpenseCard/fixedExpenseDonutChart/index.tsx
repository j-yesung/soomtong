import { DonutChart } from "@/components/ui";
import { FixedExpenseTableItem } from "@/features/expense/types";

type Props = {
  data: FixedExpenseTableItem;
};

export default function FixedExpenseDonutChart({ data }: Props) {
  const ratio = data ? (data?.totalFixedExpense / data?.budget) * 100 : 0;

  return <DonutChart value={ratio} />;
}
