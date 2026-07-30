import { ChangeEvent, useEffect, useState } from "react";

import { ArrowDown, ArrowUp, ChevronDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/features/auth/store";
import { ExpenseItem, SlotCounter } from "@/features/common/components/";
import {
  getFixedExpenseDueDates,
  useFixedExpensePaymentsQuery,
  useFixedExpenseTableQuery,
  useToggleFixedExpensePaymentMutation,
  useUserProfileQuery,
} from "@/features/common/queries";
import { FixedItem } from "@/features/common/types";
import { Button, Column, Empty, Row, Text } from "@/shared/ui";
import { getFixedExpenseDueDateForCycle } from "@/shared/utils/date";
import { safeLocalStorage } from "@/shared/utils/storage";

import * as S from "./style";

const SORT_STORAGE_KEY = "fixed-expense-sort";
const SORT_DIRECTION_STORAGE_KEY = "fixed-expense-sort-direction";
const SORT_OPTIONS = [
  { value: "dueDate", label: "납부일순" },
  { value: "amount", label: "금액순" },
  { value: "tag", label: "태그순" },
] as const;
type FixedExpenseSortCriterion = (typeof SORT_OPTIONS)[number]["value"];
type FixedExpenseSortDirection = "asc" | "desc";

const isFixedExpenseSortCriterion = (value: string | null): value is FixedExpenseSortCriterion => {
  return SORT_OPTIONS.some((option) => option.value === value);
};

export default function FixedExpenseList() {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const [sortCriterion, setSortCriterion] = useState<FixedExpenseSortCriterion>("dueDate");
  const [sortDirection, setSortDirection] = useState<FixedExpenseSortDirection>("asc");

  const fixedExpensesQuery = useFixedExpenseTableQuery(userId);
  const profileQuery = useUserProfileQuery(userId);
  const { data, isFetched, isFetching, isLoadingError, refetch } = fixedExpensesQuery;
  const {
    data: profile,
    isFetched: isProfileFetched,
    isFetching: isProfileFetching,
    isLoadingError: isProfileLoadingError,
    refetch: refetchProfile,
  } = profileQuery;
  const salaryDay = profile?.day ?? 1;
  const dueDates = getFixedExpenseDueDates(data?.items, salaryDay);
  const paymentsQuery = useFixedExpensePaymentsQuery(userId, data?.items, profile?.day);
  const {
    data: payments = [],
    isFetched: isPaymentsFetched,
    isFetching: isPaymentsFetching,
    isLoadingError: isPaymentsLoadingError,
    refetch: refetchPayments,
  } = paymentsQuery;
  const { mutate: togglePaid } = useToggleFixedExpensePaymentMutation(dueDates);

  useEffect(() => {
    const storedCriterion = safeLocalStorage.getItem(SORT_STORAGE_KEY);
    const storedDirection = safeLocalStorage.getItem(SORT_DIRECTION_STORAGE_KEY);

    if (isFixedExpenseSortCriterion(storedCriterion)) setSortCriterion(storedCriterion);
    if (storedDirection === "asc" || storedDirection === "desc") setSortDirection(storedDirection);
  }, []);

  const sortedItems = [...(data?.items ?? [])].sort((a, b) => {
    let comparison: number;

    switch (sortCriterion) {
      case "amount":
        comparison = a.amount - b.amount;
        break;
      case "tag":
        comparison = a.tag.localeCompare(b.tag, "ko");
        break;
      default:
        comparison = getFixedExpenseDueDateForCycle(a, salaryDay).localeCompare(
          getFixedExpenseDueDateForCycle(b, salaryDay),
        );
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  const hasItems = sortedItems.length > 0;
  const isInitialLoading = !isFetched || !isProfileFetched || (hasItems && !isPaymentsFetched);
  const hasLoadingError = isLoadingError || isProfileLoadingError || (hasItems && isPaymentsLoadingError);
  const isRetrying = isFetching || isProfileFetching || isPaymentsFetching;
  const totalAmount = data?.totalFixedExpense ?? 0;
  const paidKeys = new Set(
    payments.filter((payment) => payment.paidAt).map((payment) => `${payment.fixedItemCreatedAt}:${payment.dueDate}`),
  );
  const remainingAmount =
    data?.items?.reduce((sum, item) => {
      const dueDate = getFixedExpenseDueDateForCycle(item, salaryDay);
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
    const nextCriterion = event.target.value;
    if (!isFixedExpenseSortCriterion(nextCriterion)) return;

    setSortCriterion(nextCriterion);
    safeLocalStorage.setItem(SORT_STORAGE_KEY, nextCriterion);
  };

  const handleSortDirectionClick = () => {
    const nextDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(nextDirection);
    safeLocalStorage.setItem(SORT_DIRECTION_STORAGE_KEY, nextDirection);
  };

  const handleTogglePaid = (item: FixedItem) => {
    const dueDate = getFixedExpenseDueDateForCycle(item, salaryDay);
    const isPaid = paidKeys.has(`${item.createdAt}:${dueDate}`);

    togglePaid({
      userId,
      fixedItemCreatedAt: item.createdAt,
      dueDate,
      isPaid,
    });
  };

  const handleRetry = () => {
    void Promise.all([refetch(), refetchProfile(), ...(hasItems ? [refetchPayments()] : [])]);
  };

  return (
    <S.ListScreenContainer aria-busy={isInitialLoading}>
      <Text size={24} weight={700}>
        고정지출
      </Text>

      <S.SummarySlot>
        {!isInitialLoading && !hasLoadingError && totalAmount > 0 && (
          <Column gap={2}>
            <SlotCounter value={totalAmount} animationKey={`fixed-expense-total:${userId}`} fontSize={24} suffix="원" />
            <Text size={13} weight={600} color={remainingAmount > 0 ? "secondary" : "darkBlue"}>
              {remainingAmount > 0 ? `잔여 납부 금액 ${remainingAmount.toLocaleString()}원` : "이번 회차 납부 완료"}
            </Text>
          </Column>
        )}
      </S.SummarySlot>

      <S.ListActions $hasItems={!isInitialLoading && !hasLoadingError && hasItems}>
        {!isInitialLoading && !hasLoadingError && hasItems && (
          <Row gap={8} align="center">
            <S.SortControl>
              <span>{SORT_OPTIONS.find((option) => option.value === sortCriterion)?.label}</span>
              <ChevronDown size={14} aria-hidden />
              <S.SortSelect value={sortCriterion} onChange={handleSortChange} aria-label="고정지출 정렬 기준">
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </S.SortSelect>
            </S.SortControl>
            <Button
              onClick={handleSortDirectionClick}
              width={44}
              height={44}
              variant="outline"
              color="secondary"
              size="s"
              radius="pill"
              aria-label={sortDirection === "asc" ? "내림차순으로 변경" : "오름차순으로 변경"}
            >
              {sortDirection === "asc" ? <ArrowUp size={16} aria-hidden /> : <ArrowDown size={16} aria-hidden />}
            </Button>
          </Row>
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

      {hasLoadingError ? (
        <S.Feedback role="alert">
          <Text size={15} weight={600}>
            고정지출을 불러오지 못했어요.
          </Text>
          <Text size={13} color="secondary">
            네트워크 연결을 확인하고 다시 시도해 주세요.
          </Text>
          <Button variant="outline" width={96} height={40} onClick={handleRetry} disabled={isRetrying}>
            다시 시도
          </Button>
        </S.Feedback>
      ) : isInitialLoading ? null : hasItems ? (
        <S.ListBox>
          {sortedItems.map((item) => {
            const dueDate = getFixedExpenseDueDateForCycle(item, salaryDay);
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
