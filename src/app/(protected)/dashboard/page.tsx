import { Column, Heading, Row } from "@/components/ui";
import { BudgetBoardScreen, FixedExpenseBoardScreen } from "@/screen/dashboard";

export default function DashboardPage() {
  return (
    <Column gap={24}>
      <Row gap={4} align="center">
        <Heading level={3} fontWeight="bold">
          Soomtong
        </Heading>
      </Row>
      <Column gap={12}>
        <BudgetBoardScreen />
        <FixedExpenseBoardScreen />
      </Column>
    </Column>
  );
}
