import { Column, Text } from "@/components/ui";
import { FixedExpenseTableItem } from "@/features/expense/types";

type Props = {
  data: FixedExpenseTableItem;
};

export default function FixedExpenseReport({ data }: Props) {
  const totalCount = data?.items?.length ?? 0;

  return (
    <Column gap={4} flex={1}>
      <Text size={18} weight={500}>
        총 {totalCount}건이
        <br />
        매월 발생하고 있어요
      </Text>
      <Text size={24} weight={700}>
        {data?.totalFixedExpense?.toLocaleString()}원
      </Text>
    </Column>
  );
}
