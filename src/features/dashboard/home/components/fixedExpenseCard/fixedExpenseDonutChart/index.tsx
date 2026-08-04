import { FixedExpenseTableItem } from "@/features/common/types";
import { DonutChart } from "@/shared/ui";

type Props = {
  data: FixedExpenseTableItem;
};

export default function FixedExpenseDonutChart({ data }: Props) {
  const budget = data?.budget ?? 0;
  const totalFixed = data?.totalFixedExpense ?? 0;
  const ratio = budget > 0 ? (totalFixed / budget) * 100 : 0;
  const color = ratio >= 80 ? "var(--color-danger)" : ratio >= 50 ? "var(--color-warning)" : undefined;

  return (
    <DonutChart
      value={ratio}
      color={color}
      ariaLabel={`월수입 대비 고정지출 비율 ${Math.round(ratio)}%`}
    />
  );
}
