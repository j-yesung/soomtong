import { Column } from "@/components/ui";
import { ExpenseItem, SlotCounter } from "@/features/common/components";
import { useFixedExpenseTableQuery } from "@/features/common/queries";

export default function FixedExpenseListScreen() {
  const { data } = useFixedExpenseTableQuery();

  return (
    <Column padding={10} gap={12}>
      <SlotCounter value={data?.totalFixedExpense} suffix="원" />
      <Column gap={8} as="ul">
        {data?.items?.map((item) => (
          <ExpenseItem key={item.createdAt} items={item} />
        ))}
      </Column>
    </Column>
  );
}
