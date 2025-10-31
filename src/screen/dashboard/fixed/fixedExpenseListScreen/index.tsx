import { useState } from "react";

import { ExpenseItem, ReadyButton, SlotCounter } from "@/features/common/components";
import { useFixedExpenseTableQuery } from "@/features/common/queries";
import { FixedExpenseBottomSheet } from "@/features/dashboard/fixed/components";
import { FixedItem } from "@/features/expense/types";

import { ListBox, ListScreenContainer } from "./style";

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

  const handleSheetClose = () => setSheetOpen(false);

  return (
    <ListScreenContainer>
      <SlotCounter value={data?.totalFixedExpense} suffix="원" />

      <ListBox>
        {data?.items?.map((item) => (
          <ExpenseItem key={item.createdAt} items={item} onClick={() => handleItemClick(item)} />
        ))}
      </ListBox>

      <FixedExpenseBottomSheet onClose={handleSheetClose} open={sheetOpen} sheetType={sheetType} item={selectedItem} />

      <ReadyButton text="추가하기" onClick={handleAddClick} condition />
    </ListScreenContainer>
  );
}
