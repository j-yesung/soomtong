import { Column } from "@/components/ui";
import { BudgetBoardScreen, FixedExpenseBoardScreen } from "@/screen/(dashboard)";

export default function DashboardPage() {
  return (
    <Column gap={12}>
      <BudgetBoardScreen />
      <FixedExpenseBoardScreen />
    </Column>
  );
}
