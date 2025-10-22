import { Column, Text } from "@/components/ui";
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
      <Text variant="caption" weight={500}>
        -----
      </Text>
    </Column>
  );
}
