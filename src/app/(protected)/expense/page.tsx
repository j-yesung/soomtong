import { Column } from "@/shared/ui";
import { FixedExpenseList } from "@/features/common/components";
import { FixedExpenseHeader } from "@/features/expense/components";

export default function ExpensePage() {
  return (
    <Column gap={24} fullWidth>
      <FixedExpenseHeader />
      <Column gap={8} fullWidth>
        <FixedExpenseList renderType="expense" />
      </Column>
    </Column>
  );
}
