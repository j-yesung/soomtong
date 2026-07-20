import { useRouter } from "next/navigation";

import { useUserStore } from "@/features/auth/store";
import { ExpenseItem, SlotCounter } from "@/features/common/components/";
import {
  getFixedExpenseDueDates,
  useFixedExpensePaymentsQuery,
  useFixedExpenseTableQuery,
  useToggleFixedExpensePaymentMutation,
} from "@/features/common/queries";
import { FixedItem } from "@/features/common/types";
import { Button, Column, Empty, Row, Text } from "@/shared/ui";
import { getFixedExpenseDueDate } from "@/shared/utils/date";

import FixedExpenseListScreenSkeleton from "./skeleton";
import * as S from "./style";

export default function FixedExpenseList() {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);

  const { data, isFetched } = useFixedExpenseTableQuery(userId);
  const dueDates = getFixedExpenseDueDates(data?.items);
  const { data: payments = [] } = useFixedExpensePaymentsQuery(userId, data?.items);
  const { mutate: togglePaid } = useToggleFixedExpensePaymentMutation(dueDates);

  const hasItems = (data?.items?.length ?? 0) > 0;
  const totalAmount = data?.totalFixedExpense ?? 0;
  const paidKeys = new Set(payments.map((payment) => `${payment.fixedItemCreatedAt}:${payment.dueDate}`));
  const remainingAmount =
    data?.items?.reduce((sum, item) => {
      const dueDate = getFixedExpenseDueDate(item);
      const isPaid = paidKeys.has(`${item.createdAt}:${dueDate}`);
      return isPaid ? sum : sum + item.amount;
    }, 0) ?? 0;

  const handleItemClick = (item: FixedItem) => {
    router.push(`/dashboard/fixed/${item.createdAt}/edit`);
  };

  const handleAddClick = () => {
    router.push("/dashboard/fixed/new");
  };

  const handleTogglePaid = (item: FixedItem) => {
    const dueDate = getFixedExpenseDueDate(item);
    const isPaid = paidKeys.has(`${item.createdAt}:${dueDate}`);

    togglePaid({
      userId,
      fixedItemCreatedAt: item.createdAt,
      dueDate,
      isPaid,
    });
  };

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

      {totalAmount > 0 && (
        <Column gap={2}>
          <SlotCounter value={totalAmount} fontSize={24} suffix="원" />
          <Text size={13} weight={600} color={remainingAmount > 0 ? "secondary" : "darkBlue"}>
            {remainingAmount > 0 ? `잔여 납부 금액 ${remainingAmount.toLocaleString()}원` : "이번 회차 납부 완료"}
          </Text>
        </Column>
      )}

      {hasItems ? (
        <S.ListBox $hasItems={hasItems}>
          {data?.items?.map((item) => {
            const dueDate = getFixedExpenseDueDate(item);
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
    </S.ListScreenContainer>
  );
}
