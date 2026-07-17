import { useState } from "react";

import { useUserStore } from "@/features/auth/store";
import { ExpenseItem, SlotCounter } from "@/features/common/components/";
import {
  getFixedExpenseDueDates,
  useFixedExpensePaymentsQuery,
  useFixedExpenseTableQuery,
  useToggleFixedExpensePaymentMutation,
} from "@/features/common/queries";
import { FixedItem } from "@/features/common/types";
import { FixedExpenseBottomSheet } from "@/features/dashboard/fixed/components";
import { Button, Empty, Row, Text } from "@/shared/ui";
import { getCurrentFixedExpenseDueDate } from "@/shared/utils/date";

import FixedExpenseListScreenSkeleton from "./skeleton";
import * as S from "./style";

export default function FixedExpenseList() {
  const [sheetType, setSheetType] = useState<"add" | "edit">("add");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FixedItem>({} as FixedItem);

  const userId = useUserStore((state) => state.userId);

  const { data, isFetched } = useFixedExpenseTableQuery(userId);
  const dueDates = getFixedExpenseDueDates(data?.items);
  const { data: payments = [] } = useFixedExpensePaymentsQuery(userId, data?.items);
  const { mutate: togglePaid } = useToggleFixedExpensePaymentMutation(dueDates);

  const hasItems = (data?.items?.length ?? 0) > 0;
  const totalAmount = data?.totalFixedExpense ?? 0;
  const paidKeys = new Set(payments.map((payment) => `${payment.fixedItemCreatedAt}:${payment.dueDate}`));

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

  const handleTogglePaid = (item: FixedItem) => {
    const dueDate = getCurrentFixedExpenseDueDate(item.day);
    const isPaid = paidKeys.has(`${item.createdAt}:${dueDate}`);

    togglePaid({
      userId,
      fixedItemCreatedAt: item.createdAt,
      dueDate,
      isPaid,
    });
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
        <Button
          onClick={handleAddClick}
          width={70}
          height={36}
          variant="fill"
          size="s"
          radius="pill"
          aria-label="고정지출 추가"
        >
          <Row gap={5} align="center">
            <Text size={14} weight={600} color="inverseWhite">
              추가
            </Text>
          </Row>
        </Button>
      </Row>

      {totalAmount > 0 && <SlotCounter value={totalAmount} fontSize={24} suffix="원" />}

      {hasItems ? (
        <S.ListBox $hasItems={hasItems}>
          {data?.items?.map((item) => {
            const dueDate = getCurrentFixedExpenseDueDate(item.day);
            const isPaid = paidKeys.has(`${item.createdAt}:${dueDate}`);

            return (
              <ExpenseItem
                key={item.createdAt}
                items={item}
                dueDate={dueDate}
                isPaid={isPaid}
                onClick={() => handleItemClick(item)}
                onTogglePaid={() => handleTogglePaid(item)}
              />
            );
          })}
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
