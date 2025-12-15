import { useState } from "react";

import { useRouter } from "next/navigation";

import { ExpenseItem, ReadyButton, SlotCounter } from "@/features/common/components/";
import { useFixedExpenseTableQuery } from "@/features/common/queries";
import { FixedExpenseBottomSheet } from "@/features/dashboard/fixed/components";
import { FixedItem } from "@/features/expense/types";

import * as S from "./style";

type Props = {
  renderType: "expense" | "dashboard";
};

export default function FixedExpenseList({ renderType }: Props) {
  const [sheetType, setSheetType] = useState<"add" | "edit">("add");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FixedItem>({} as FixedItem);

  const router = useRouter();

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
    <S.ListScreenContainer>
      <SlotCounter value={data?.totalFixedExpense} suffix="원" />

      <S.ListBox>
        {data?.items?.map((item) => (
          <ExpenseItem key={item.createdAt} items={item} onClick={() => handleItemClick(item)} />
        ))}
        <S.ListAddButton onClick={handleAddClick}>추가하기</S.ListAddButton>
      </S.ListBox>

      <FixedExpenseBottomSheet onClose={handleSheetClose} open={sheetOpen} sheetType={sheetType} item={selectedItem} />

      {renderType === "expense" && (
        <ReadyButton text="다음" onClick={() => router.push("/dashboard")} condition={data?.items.length > 0} />
      )}
    </S.ListScreenContainer>
  );
}
