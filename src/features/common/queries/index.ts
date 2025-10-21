import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { getFixedExpenseTable } from "@/features/common/api";

export const userAmountQueryKeys = {
  fixedExpenseTable: () => ["fixedExpense"],
  landing: () => ["landing"],
};

export function useFixedExpenseTableQuery() {
  return useSuspenseQuery({
    queryKey: userAmountQueryKeys.fixedExpenseTable(),
    queryFn: () => getFixedExpenseTable(),
    refetchOnWindowFocus: false,
    select: (data) => {
      const totalFixedExpense = data?.items?.reduce((acc, cur) => acc + cur.amount, 0);
      const amountAvailable = data?.budget - totalFixedExpense;
      return { ...data, amountAvailable, totalFixedExpense };
    },
  });
}

export function useLandingFixedExpenseQuery() {
  return useQuery({
    queryKey: userAmountQueryKeys.landing(),
    queryFn: () => getFixedExpenseTable(),
    refetchOnWindowFocus: false,
    select: (data) => ({
      budget: data?.budget,
      items: data?.items ?? [],
    }),
  });
}
