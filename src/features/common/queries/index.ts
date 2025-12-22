import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useUserStore } from "@/features/auth/store";
import {
  AddExpenseParams,
  AmountSummary,
  FixedAddParams,
  FixedExpenseTableItem,
  FixedRemoveItem,
  FixedRow,
  FixedUpdateItem,
} from "@/features/expense/types";
import {
  addExpense,
  addFixedItem,
  getCurrentMonthAmountSummary,
  getFixedExpenseTable,
  removeFixedItem,
  updateFixedItem,
} from "@/supabase/expense";

export const userAmountQueryKeys = {
  fixedExpenseTable: (userId: string) => ["fixedExpense", userId],
  addFixedExpense: () => ["addFixedExpense"],
  removeFixedExpense: () => ["deleteFixedExpense"],
  updateFixedExpense: () => ["updateFixedExpense"],
  summary: (userId: string, ym: string) => ["amountSummary", userId, ym],
  addExpense: () => ["addExpense"],
};

/**
 * 고정 지출 내역 조회
 */
export function useFixedExpenseTableQuery() {
  const userId = useUserStore((state) => state.userInfo).id;

  return useQuery({
    queryKey: userAmountQueryKeys.fixedExpenseTable(userId),
    queryFn: () => getFixedExpenseTable(userId),
    refetchOnWindowFocus: false,
    select: (data) => {
      const totalFixedExpense = data?.items?.reduce((acc, cur) => acc + cur.amount, 0);
      const amountAvailable = data?.budget - totalFixedExpense;
      return { ...data, amountAvailable, totalFixedExpense } as FixedExpenseTableItem;
    },
    initialData: {} as FixedExpenseTableItem,
    enabled: !!userId,
  });
}

/**
 * 고정 지출 추가
 */
export function useFixedExpenseAddMutation() {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.userInfo).id;

  return useMutation({
    mutationKey: userAmountQueryKeys.addFixedExpense(),
    mutationFn: (params: FixedAddParams) => addFixedItem(params),

    onMutate: async (variables) => {
      const fixedKey = userAmountQueryKeys.fixedExpenseTable(userId);

      await queryClient.cancelQueries({ queryKey: fixedKey });

      const prevFixed = queryClient.getQueryData<FixedRow>(fixedKey);
      const optimisticItem = variables.item;

      if (prevFixed) {
        queryClient.setQueryData<FixedRow>(fixedKey, {
          ...prevFixed,
          items: [...prevFixed.items, optimisticItem],
        });
      }

      return { prevFixed };
    },

    onError: (_error, _variables, context) => {
      if (context?.prevFixed) {
        queryClient.setQueryData(userAmountQueryKeys.fixedExpenseTable(userId), context.prevFixed);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: userAmountQueryKeys.fixedExpenseTable(userId),
      });
    },
  });
}

/**
 * 고정 지출 삭제
 */
export function useFixedExpenseRemoveMutation() {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.userInfo).id;

  return useMutation({
    mutationKey: userAmountQueryKeys.removeFixedExpense(),
    mutationFn: (params: FixedRemoveItem) => removeFixedItem(params),

    onMutate: async (variables) => {
      const fixedKey = userAmountQueryKeys.fixedExpenseTable(userId);

      await queryClient.cancelQueries({ queryKey: fixedKey });

      const prevFixed = queryClient.getQueryData<FixedRow>(fixedKey);
      const { tag, createdAt } = variables;

      if (prevFixed) {
        queryClient.setQueryData<FixedRow>(fixedKey, {
          ...prevFixed,
          items: prevFixed.items.filter((i) => !(i.tag === tag && i.createdAt === createdAt)),
        });
      }

      return { prevFixed };
    },

    onError: (_error, _variables, context) => {
      if (context?.prevFixed) {
        queryClient.setQueryData(userAmountQueryKeys.fixedExpenseTable(userId), context.prevFixed);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: userAmountQueryKeys.fixedExpenseTable(userId),
      });
    },
  });
}

/**
 * 고정 지출 수정
 */
export function useFixedExpenseUpdateMutation() {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.userInfo).id;

  return useMutation({
    mutationKey: userAmountQueryKeys.updateFixedExpense(),
    mutationFn: (params: FixedUpdateItem) => updateFixedItem(params),

    onMutate: async (variables) => {
      const fixedKey = userAmountQueryKeys.fixedExpenseTable(userId);

      await queryClient.cancelQueries({ queryKey: fixedKey });

      const prevFixed = queryClient.getQueryData<FixedRow>(fixedKey);
      const targetCreatedAt = variables.createdAt;
      const nextItem = { ...variables.item, createdAt: targetCreatedAt };

      if (prevFixed) {
        queryClient.setQueryData<FixedRow>(fixedKey, {
          ...prevFixed,
          items: prevFixed.items.map((i) => (i.createdAt === targetCreatedAt ? nextItem : i)),
        });
      }

      return { prevFixed };
    },

    onError: (_error, _variables, context) => {
      if (context?.prevFixed) {
        queryClient.setQueryData(userAmountQueryKeys.fixedExpenseTable(userId), context.prevFixed);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: userAmountQueryKeys.fixedExpenseTable(userId),
      });
    },
  });
}

/**
 * 당월 금액 요약 조회
 */
export function useAmountSummaryQuery() {
  const userId = useUserStore((s) => s.userInfo).id;
  const now = new Date();
  const ym = `${now.getFullYear()}-${now.getMonth() + 1}`;

  return useQuery({
    queryKey: userAmountQueryKeys.summary(userId, ym),
    queryFn: () => getCurrentMonthAmountSummary(userId),
    refetchOnWindowFocus: false,
    enabled: !!userId,
    initialData: {} as AmountSummary,
  });
}

/**
 * 생활비 지출 추가
 */
export function useAddExpenseMutation() {
  const queryClient = useQueryClient();
  const now = new Date();
  const ym = `${now.getFullYear()}-${now.getMonth() + 1}`;

  return useMutation({
    mutationFn: (params: AddExpenseParams) => addExpense(params),

    onMutate: async (variables) => {
      const { userId, amount } = variables;
      const summaryKey = userAmountQueryKeys.summary(userId, ym);

      await queryClient.cancelQueries({ queryKey: summaryKey });

      const prevSummary = queryClient.getQueryData<AmountSummary>(summaryKey);

      if (prevSummary) {
        queryClient.setQueryData<AmountSummary>(summaryKey, {
          ...prevSummary,
          totalVariable: prevSummary.totalVariable + amount,
          amountAvailable: prevSummary.amountAvailable - amount,
        });
      }

      return { prevSummary, userId };
    },

    onError: (_error, _variables, context) => {
      if (context?.prevSummary) {
        queryClient.setQueryData(userAmountQueryKeys.summary(context.userId, ym), context.prevSummary);
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: userAmountQueryKeys.summary(variables.userId, ym),
      });
    },
  });
}
