import { BudgetBoard, FixedExpenseBoard } from "@/features/dashboard/home/components";
import { Column } from "@/shared/ui";

export default function HomeScreen() {
  return (
    <Column gap={12}>
      <BudgetBoard />
      <FixedExpenseBoard />
    </Column>
  );
}
