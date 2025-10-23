import { Column, Text } from "@/components/ui";
import { SlotCounter } from "@/features/common/components";
import { useFixedExpenseTableQuery } from "@/features/common/queries";

export default function FixedExpenseReport() {
  const { data } = useFixedExpenseTableQuery();

  return (
    <Column gap={4} flex={1}>
      <Text size={18} weight={500}>
        총 {data?.items.length}건이
        <br />
        매월 발생하고 있어요
      </Text>
      <SlotCounter value={data?.totalFixedExpense} fontSize={24} suffix="원" />
    </Column>
  );
}
