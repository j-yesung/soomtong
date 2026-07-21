import { ChangeEvent, useEffect, useState } from "react";

import { ChevronDown, Plus } from "lucide-react";
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
import { safeLocalStorage } from "@/shared/utils/storage";

import FixedExpenseListScreenSkeleton from "./skeleton";
import * as S from "./style";

const SORT_STORAGE_KEY = "fixed-expense-sort";
const SORT_OPTIONS = [
  { value: "dueDate", label: "납부일 빠른순" },
  { value: "amountDesc", label: "금액 높은순" },
  { value: "amountAsc", label: "금액 낮은순" },
  { value: "tag", label: "태그 가나다순" },
] as const;
type FixedExpenseSort = (typeof SORT_OPTIONS)[number]["value"];

const isFixedExpenseSort = (value: string | null): value is FixedExpenseSort => {
  return SORT_OPTIONS.some((option) => option.value === value);
};

export default function FixedExpenseList() {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const [sort, setSort] = useState<FixedExpenseSort>("dueDate");

  const { data, isFetched } = useFixedExpenseTableQuery(userId);
  const dueDates = getFixedExpenseDueDates(data?.items);
  const { data: payments = [] } = useFixedExpensePaymentsQuery(userId, data?.items);
  const { mutate: togglePaid } = useToggleFixedExpensePaymentMutation(dueDates);

  useEffect(() => {
    const storedSort = safeLocalStorage.getItem(SORT_STORAGE_KEY);
    if (isFixedExpenseSort(storedSort)) setSort(storedSort);
  }, []);

  const sortedItems = [...(data?.items ?? [])].sort((a, b) => {
    switch (sort) {
      case "amountDesc":
        return b.amount - a.amount;
      case "amountAsc":
        return a.amount - b.amount;
      case "tag":
        return a.tag.localeCompare(b.tag, "ko");
      default:
        return getFixedExpenseDueDate(a).localeCompare(getFixedExpenseDueDate(b));
    }
  });

  const hasItems = sortedItems.length > 0;
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

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextSort = event.target.value;
    if (!isFixedExpenseSort(nextSort)) return;

    setSort(nextSort);
    safeLocalStorage.setItem(SORT_STORAGE_KEY, nextSort);
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
      <Text size={24} weight={700}>
        고정지출
      </Text>

      {totalAmount > 0 && (
        <Column gap={2}>
          <SlotCounter value={totalAmount} animationKey={`fixed-expense-total:${userId}`} fontSize={24} suffix="원" />
          <Text size={13} weight={600} color={remainingAmount > 0 ? "secondary" : "darkBlue"}>
            {remainingAmount > 0 ? `잔여 납부 금액 ${remainingAmount.toLocaleString()}원` : "이번 회차 납부 완료"}
          </Text>
        </Column>
      )}

      <S.ListActions $hasItems={hasItems}>
        {hasItems && (
          <S.SortControl>
            <span>{SORT_OPTIONS.find((option) => option.value === sort)?.label}</span>
            <ChevronDown size={14} aria-hidden />
            <S.SortSelect value={sort} onChange={handleSortChange} aria-label="고정지출 정렬">
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </S.SortSelect>
          </S.SortControl>
        )}
        <Button
          onClick={handleAddClick}
          width={84}
          height={44}
          variant="fill"
          size="s"
          radius="pill"
          aria-label="고정지출 추가"
        >
          <Row gap={6} align="center">
            <Plus size={16} aria-hidden />
            <Text size={14} weight={600} color="inverseWhite">
              추가
            </Text>
          </Row>
        </Button>
      </S.ListActions>

      {hasItems ? (
        <S.ListBox>
          {sortedItems.map((item) => {
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
