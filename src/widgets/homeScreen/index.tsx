import { BudgetBoard, FixedExpenseBoard } from "@/features/dashboard/home/components";
import { Column } from "@/shared/ui";

export default function HomeScreen({ userId }: { userId: string }) {
  return (
    <Column gap={12}>
      <BudgetBoard userId={userId} />
      <FixedExpenseBoard userId={userId} />
    </Column>
  );
}
