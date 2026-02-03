import { useMemo } from "react";

import { getDate, parseISO } from "date-fns";

import { useUserStore } from "@/features/auth/store";
import { useDetailExpenseListQuery, useFixedExpenseTableQuery } from "@/features/common/queries";
import { ExpenseList, FixedItem } from "@/features/expense/types";

export type DayExpenseData = {
  fixed: FixedItem[];
  variable: ExpenseList[];
};

export type ExpensesByDay = Map<number, DayExpenseData>;

/**
 * 달력에 표시할 지출 데이터를 일별로 그룹핑
 */
export function useCalendarExpenseData(year: number, month: number) {
  const userId = useUserStore((state) => state.userInfo).id;

  const { data: fixedData, isFetched: isFixedFetched } = useFixedExpenseTableQuery(userId);
  const { data: variableData, isFetched: isVariableFetched } = useDetailExpenseListQuery();

  const expensesByDay = useMemo<ExpensesByDay>(() => {
    const map = new Map<number, DayExpenseData>();

    // 고정 지출은 day 필드 기준으로 그룹핑
    if (fixedData?.items) {
      for (const item of fixedData.items) {
        const day = item.day;
        if (!map.has(day)) {
          map.set(day, { fixed: [], variable: [] });
        }
        map.get(day)!.fixed.push(item);
      }
    }

    // 일반 지출은 날짜 기준으로 해당 월만 필터링
    if (variableData) {
      for (const expense of variableData) {
        const spentDate = parseISO(expense.spent_at);
        const expenseYear = spentDate.getFullYear();
        const expenseMonth = spentDate.getMonth() + 1;

        if (expenseYear === year && expenseMonth === month) {
          const day = getDate(spentDate);
          if (!map.has(day)) {
            map.set(day, { fixed: [], variable: [] });
          }
          map.get(day)!.variable.push(expense);
        }
      }
    }

    return map;
  }, [fixedData, variableData, year, month]);

  return {
    expensesByDay,
    isFetched: isFixedFetched && isVariableFetched,
  };
}
