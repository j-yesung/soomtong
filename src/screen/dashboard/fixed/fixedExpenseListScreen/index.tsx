import { useState } from "react";

import { Column } from "@/components/ui";
import { ExpenseItem, ReadyButton, SlotCounter } from "@/features/common/components";
import { useFixedExpenseTableQuery } from "@/features/common/queries";
import { FixedExpenseBottomSheet } from "@/features/dashboard/fixed/components";
import { FixedItem } from "@/features/expense/types";

export default function FixedExpenseListScreen() {
  const [sheetType, setSheetType] = useState<"add" | "edit">("add");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FixedItem>({} as FixedItem);

  const { data } = useFixedExpenseTableQuery();

  const handleItemClick = (item: FixedItem) => {
    setSelectedItem(item);
    setSheetType("edit");
    setSheetOpen(true);
  };

  const handleAddClick = () => {
    setSelectedItem({} as FixedItem);
    setSheetType("add");
    setSheetOpen(true);
  };

  const handleSheetClose = () => {
    setSheetOpen(false);
  };

  return (
    <Column padding={10} gap={12}>
      <SlotCounter value={data?.totalFixedExpense} suffix="원" />
      <Column as="ul" gap={8} paddingBottom={68}>
        {data?.items?.map((item) => (
          <ExpenseItem key={item.createdAt} items={item} onClick={() => handleItemClick(item)} />
        ))}
      </Column>

      <FixedExpenseBottomSheet onClose={handleSheetClose} open={sheetOpen} sheetType={sheetType} item={selectedItem} />

      <ReadyButton position="bottom" text="추가하기" onClick={handleAddClick} condition />
    </Column>
  );
}
