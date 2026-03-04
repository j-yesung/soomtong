import { useState } from "react";

import { useUserStore } from "@/features/auth/store";
import { ExpenseItem, SlotCounter } from "@/features/common/components/";
import { useFixedExpenseTableQuery } from "@/features/common/queries";
import { FixedExpenseBottomSheet } from "@/features/dashboard/fixed/components";
import { FixedItem } from "@/features/expense/types";
import { Button, Empty, Row, Text } from "@/shared/ui";

import FixedExpenseListScreenSkeleton from "./skeleton";
import * as S from "./style";

export default function FixedExpenseList() {
  const [sheetType, setSheetType] = useState<"add" | "edit">("add");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FixedItem>({} as FixedItem);

  const userId = useUserStore((state) => state.userInfo).id;

  const { data, isFetched } = useFixedExpenseTableQuery(userId);

  const hasItems = (data?.items?.length ?? 0) > 0;
  const totalAmount = data?.totalFixedExpense ?? 0;

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

  if (!isFetched) {
    return <FixedExpenseListScreenSkeleton />;
  }

  return (
    <S.ListScreenContainer>
      <Row justify="space-between" align="center" fullWidth>
        <Text size={24} weight={700}>
          고정지출
        </Text>
        <Button onClick={handleAddClick} width={42} height={42}>
          +
        </Button>
      </Row>

      {totalAmount > 0 && <SlotCounter value={totalAmount} fontSize={24} suffix="원" />}

      {hasItems ? (
        <S.ListBox $hasItems={hasItems}>
          {data?.items?.map((item) => (
            <ExpenseItem key={item.createdAt} items={item} onClick={() => handleItemClick(item)} />
          ))}
        </S.ListBox>
      ) : (
        <S.EmptyState>
          <Empty description="아직 등록된 고정지출이 없어요." />
        </S.EmptyState>
      )}

      <FixedExpenseBottomSheet onClose={handleSheetClose} open={sheetOpen} sheetType={sheetType} item={selectedItem} />
    </S.ListScreenContainer>
  );
}
