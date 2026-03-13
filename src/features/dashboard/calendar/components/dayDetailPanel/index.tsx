import { format, getDate } from "date-fns";
import { ko } from "date-fns/locale";

import { ExpensesByDay } from "@/features/dashboard/calendar/hooks/useCalendarExpenseData";
import { Column, Row, Text } from "@/shared/ui";

import * as S from "./style";

type Props = {
  selectedDate: Date;
  expensesByDay: ExpensesByDay;
};

export default function DayDetailPanel({ selectedDate, expensesByDay }: Props) {
  const dayOfMonth = getDate(selectedDate);
  const expenseData = expensesByDay.get(dayOfMonth);
  const fixedExpenses = expenseData?.fixed ?? [];
  const variableExpenses = expenseData?.variable ?? [];
  const hasExpenses = fixedExpenses.length > 0 || variableExpenses.length > 0;
  const dateLabel = format(selectedDate, "EEEE d", { locale: ko }).toUpperCase();

  return (
    <S.PanelContainer>
      <S.PanelHeader>
        <Text weight={600} size={13} color="gray">
          {dateLabel}
        </Text>
      </S.PanelHeader>

      <S.ScrollableContent $hasExpenses={hasExpenses}>
        {hasExpenses ? (
          <Column gap={20}>
            {/* 고정 지출 */}
            {fixedExpenses.map((expense) => (
              <Column key={`fixed-${expense.createdAt}`} gap={4}>
                <Row align="center" justify="space-between">
                  <Row gap={6} align="center">
                    <S.DotIndicator color="#007aff" />
                    <Text weight={500} size={15}>
                      {expense.tag}
                    </Text>
                  </Row>
                  <Text color="gray" size={13}>
                    {expense.amount.toLocaleString()}원
                  </Text>
                </Row>
                <Row ml={12}>
                  {expense.memo && (
                    <Text size={12} variant="caption">
                      {expense.memo}
                    </Text>
                  )}
                </Row>
              </Column>
            ))}
            {/* 변동 지출 */}
            {variableExpenses.map((expense) => (
              <div key={`variable-${expense.id}`}>
                <Row gap={6} align="center">
                  <S.DotIndicator color="#34c759" />
                  <Text weight={500} size={15}>
                    {expense.category}
                  </Text>
                </Row>
                <Column gap={4} style={{ flex: 1 }}>
                  <Text color="gray" size={13}>
                    {expense.amount.toLocaleString()}원
                  </Text>
                </Column>
              </div>
            ))}
          </Column>
        ) : (
          <S.EmptyState>
            <Text color="gray" size={14}>
              이 날짜에 등록된 내역이 없어요.
            </Text>
          </S.EmptyState>
        )}
      </S.ScrollableContent>
    </S.PanelContainer>
  );
}
