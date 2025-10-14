import { useSuspenseQuery } from "@tanstack/react-query";

import { getFixedExpenseTable } from "@/features/common/api";

export const userAmountQueryKeys = {
  fixedExpenseTable: () => ["fixedExpense"],
};

export function useFixedExpenseTableQuery() {
  return useSuspenseQuery({
    queryKey: userAmountQueryKeys.fixedExpenseTable(),
    queryFn: () => getFixedExpenseTable(),
    refetchOnWindowFocus: false,
  });
}
