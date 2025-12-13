import { Column } from "@/components/ui";
import { FixedExpenseHeader, FixedExpenseNextButton } from "@/features/expense/components";
import FixedExpenseListScreen from "@/screen/common/fixedExpenseListScreen";

export default function ExpensePage() {
  return (
    <Column gap={24} fullWidth>
      <FixedExpenseHeader />
      <FixedExpenseNextButton />
      <FixedExpenseListScreen />
    </Column>
  );
}
