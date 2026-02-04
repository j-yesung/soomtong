"use client";

import { format, getDate } from "date-fns";
import { ko } from "date-fns/locale";
import styled from "styled-components";

import { Column, Row, Text } from "@/components/ui";
import { ExpensesByDay } from "@/features/dashboard/calendar/hooks/useCalendarExpenseData";

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
    <PanelContainer>
      <PanelHeader>
        <Text weight={600} size={13} color="gray">
          {dateLabel}
        </Text>
      </PanelHeader>

      <ScrollableContent>
        {hasExpenses ? (
          <Column gap={20}>
            {/* 고정 지출 */}
            {fixedExpenses.map((expense) => (
              <ExpenseItem key={`fixed-${expense.createdAt}`}>
                <DotIndicator color="#007aff" />
                <Column gap={4} style={{ flex: 1 }}>
                  <Text weight={500} size={15}>
                    {expense.tag}
                  </Text>
                  <Text color="gray" size={13}>
                    {expense.amount.toLocaleString()}원
                  </Text>
                </Column>
              </ExpenseItem>
            ))}
            {/* 변동 지출 */}
            {variableExpenses.map((expense) => (
              <ExpenseItem key={`variable-${expense.id}`}>
                <DotIndicator color="#34c759" />
                <Column gap={4} style={{ flex: 1 }}>
                  <Text weight={500} size={15}>
                    {expense.category}
                  </Text>
                  <Text color="gray" size={13}>
                    {expense.amount.toLocaleString()}원
                  </Text>
                </Column>
              </ExpenseItem>
            ))}
          </Column>
        ) : (
          <EmptyState>
            <Text color="gray" size={14}>
              이 날짜에 등록된 내역이 없습니다.
            </Text>
          </EmptyState>
        )}
      </ScrollableContent>
    </PanelContainer>
  );
}

const PanelContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const PanelHeader = styled.div`
  padding: 20px 20px 12px;
  border-bottom: 1px solid #f0f0f0;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
`;

const ExpenseItem = styled(Row)`
  gap: 12px;
  align-items: flex-start;
`;

const DotIndicator = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-top: 6px;
  flex-shrink: 0;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 100px;
`;
