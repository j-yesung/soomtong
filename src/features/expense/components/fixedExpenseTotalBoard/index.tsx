import { Row } from "@/components/ui";
import { SlotCounter } from "@/features/common/components";
import { useFixedExpenseStore } from "@/features/expense/store";

export default function FixedExpenseTotalBoard() {
  const items = useFixedExpenseStore((state) => state.items);
  const total = items?.reduce((acc, item) => acc + item.amount, 0);

  return (
    <Row align="center" borderRadius={4} padding={2} gap={2} fullWidth>
      {total > 0 && <SlotCounter value={total} suffix="원" />}
    </Row>
  );
}
