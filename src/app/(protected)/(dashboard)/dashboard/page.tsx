import { Box, Column } from "@/components/ui";
import { BudgetBoardScreen, FixedExpenseBoardScreen } from "@/screen/dashboard";

export default function DashboardPage() {
  return (
    <Box pb={96} position="relative">
      <Column gap={12}>
        <BudgetBoardScreen />
        <FixedExpenseBoardScreen />
      </Column>
    </Box>
  );
}
