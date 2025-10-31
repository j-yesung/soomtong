import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { useUserStore } from "@/features/auth/store";
import { getFixedExpenseTable } from "@/features/common/api";
import { FixedAddParams } from "@/features/expense/types";
import { addFixedItem } from "@/supabase/expense";

export const userAmountQueryKeys = {
  fixedExpenseTable: (userId: string) => ["fixedExpense", userId],
  landing: () => ["landing"],
  addFixedExpense: () => ["addFixedExpense"],
};

export function useFixedExpenseTableQuery() {
  const userId = useUserStore((state) => state.userInfo).id;

  return useSuspenseQuery({
    queryKey: userAmountQueryKeys.fixedExpenseTable(userId),
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

export function useFixedExpenseAddMutation() {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.userInfo).id;

  return useMutation({
    mutationKey: userAmountQueryKeys.addFixedExpense(),
    mutationFn: (params: FixedAddParams) => addFixedItem(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userAmountQueryKeys.fixedExpenseTable(userId) });
    },
  });
}
