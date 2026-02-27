import { DonutChart } from "@/shared/ui";
import { FixedExpenseTableItem } from "@/features/expense/types";

type Props = {
  data: FixedExpenseTableItem;
};

export default function FixedExpenseDonutChart({ data }: Props) {
  const budget = data?.budget ?? 0;
  const totalFixed = data?.totalFixedExpense ?? 0;
  const ratio = budget > 0 ? (totalFixed / budget) * 100 : 0;

  return <DonutChart value={ratio} />;
}
