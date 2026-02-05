import { getDate } from "date-fns";

import { BottomSheet, Column, Row, Text } from "@/shared/ui";
import { ExpensesByDay } from "@/features/dashboard/calendar/hooks/useCalendarExpenseData";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  selectedDate: Date | undefined;
  dateLabel: string;
  expensesByDay: ExpensesByDay;
};

export default function DayDetailSheet({ onClose, isOpen, selectedDate, dateLabel, expensesByDay }: Props) {
  const dayOfMonth = selectedDate ? getDate(selectedDate) : 0;
  const expenseData = expensesByDay.get(dayOfMonth);

  const fixedExpenses = expenseData?.fixed ?? [];
  const variableExpenses = expenseData?.variable ?? [];
  const hasExpenses = fixedExpenses.length > 0 || variableExpenses.length > 0;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={dateLabel}>
      <Column gap={16} pvh={[16, 0]}>
        {hasExpenses ? (
          <>
            {/* 고정 지출 */}
            {fixedExpenses.map((expense) => (
              <Row key={`fixed-${expense.createdAt}`} gap={12} align="flex-start">
                <Text size={24}>📌</Text>
                <Column gap={4} flex={1}>
                  <Text weight={500} size={15}>
                    {expense.tag}
                  </Text>
                  <Text color="gray" size={13}>
                    {expense.amount.toLocaleString()}원
                  </Text>
                </Column>
              </Row>
            ))}
            {/* 변동 지출 */}
            {variableExpenses.map((expense) => (
              <Row key={`variable-${expense.id}`} gap={12} align="flex-start">
                <Text size={24}>💰</Text>
                <Column gap={4} flex={1}>
                  <Text weight={500} size={15}>
                    {expense.category}
                  </Text>
                  <Text color="gray" size={13}>
                    {expense.amount.toLocaleString()}원
                  </Text>
                </Column>
              </Row>
            ))}
          </>
        ) : (
          <Text color="gray" align="center" size={14}>
            이 날짜에 등록된 내역이 없습니다.
          </Text>
        )}
      </Column>
    </BottomSheet>
  );
}
