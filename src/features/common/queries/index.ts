import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { useUserStore } from "@/features/auth/store";
import { getFixedExpenseTable } from "@/features/common/api";
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
  removeFixedItem,
  updateFixedItem,
} from "@/supabase/expense";

export const userAmountQueryKeys = {
  fixedExpenseTable: (userId: string) => ["fixedExpense", userId],
  landing: () => ["landing"],
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

  return useSuspenseQuery({
    queryKey: userAmountQueryKeys.fixedExpenseTable(userId),
    queryFn: () => getFixedExpenseTable(),
    refetchOnWindowFocus: false,
    select: (data) => {
      const totalFixedExpense = data?.items?.reduce((acc, cur) => acc + cur.amount, 0);
      const amountAvailable = data?.budget - totalFixedExpense;
      return { ...data, amountAvailable, totalFixedExpense } as FixedExpenseTableItem;
    },
  });
}

/**
 * 고정 지출 내역(랜딩 페이지) 조회
 */
export function useLandingFixedExpenseQuery() {
  return useQuery({
    queryKey: userAmountQueryKeys.landing(),
    queryFn: () => getFixedExpenseTable(),
    refetchOnWindowFocus: false,
    select: (data) => ({
      budget: data?.budget,
      items: data?.items ?? [],
    }),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
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
      const landingKey = userAmountQueryKeys.landing();

      await Promise.all([
        queryClient.cancelQueries({ queryKey: fixedKey }),
        queryClient.cancelQueries({ queryKey: landingKey }),
      ]);

      const prevFixed = queryClient.getQueryData<FixedRow>(fixedKey);
      const prevLanding = queryClient.getQueryData<FixedRow>(landingKey);

      const optimisticItem = variables.item;

      if (prevFixed) {
        queryClient.setQueryData<FixedRow>(fixedKey, {
          ...prevFixed,
          items: [...(prevFixed.items ?? []), optimisticItem],
        });
      }
      if (prevLanding) {
        queryClient.setQueryData<FixedRow>(landingKey, {
          ...prevLanding,
          items: [...(prevLanding.items ?? []), optimisticItem],
        });
      }

      return { prevFixed, prevLanding };
    },

    onError: (_error, _variables, context) => {
      const fixedKey = userAmountQueryKeys.fixedExpenseTable(userId);
      const landingKey = userAmountQueryKeys.landing();

      if (context?.prevFixed) {
        queryClient.setQueryData<FixedRow>(fixedKey, context.prevFixed);
      }
      if (context?.prevLanding) {
        queryClient.setQueryData<FixedRow>(landingKey, context.prevLanding);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userAmountQueryKeys.fixedExpenseTable(userId) });
      queryClient.invalidateQueries({ queryKey: userAmountQueryKeys.landing() });
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
      const landingKey = userAmountQueryKeys.landing();

      await Promise.all([
        queryClient.cancelQueries({ queryKey: fixedKey }),
        queryClient.cancelQueries({ queryKey: landingKey }),
      ]);

      const prevFixed = queryClient.getQueryData<FixedRow>(fixedKey);
      const prevLanding = queryClient.getQueryData<FixedRow>(landingKey);

      const { tag, createdAt } = variables;

      if (prevFixed) {
        queryClient.setQueryData<FixedRow>(fixedKey, {
          ...prevFixed,
          items: (prevFixed.items ?? []).filter((i) => !(i.tag === tag && i.createdAt === createdAt)),
        });
      }
      if (prevLanding) {
        queryClient.setQueryData<FixedRow>(landingKey, {
          ...prevLanding,
          items: (prevLanding.items ?? []).filter((i) => !(i.tag === tag && i.createdAt === createdAt)),
        });
      }

      return { prevFixed, prevLanding };
    },

    onError: (_error, _variables, context) => {
      const fixedKey = userAmountQueryKeys.fixedExpenseTable(userId);
      const landingKey = userAmountQueryKeys.landing();

      if (context?.prevFixed) {
        queryClient.setQueryData<FixedRow>(fixedKey, context.prevFixed);
      }
      if (context?.prevLanding) {
        queryClient.setQueryData<FixedRow>(landingKey, context.prevLanding);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userAmountQueryKeys.fixedExpenseTable(userId) });
      queryClient.invalidateQueries({ queryKey: userAmountQueryKeys.landing() });
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
      const landingKey = userAmountQueryKeys.landing();

      await Promise.all([
        queryClient.cancelQueries({ queryKey: fixedKey }),
        queryClient.cancelQueries({ queryKey: landingKey }),
      ]);

      const prevFixed = queryClient.getQueryData<FixedRow>(fixedKey);
      const prevLanding = queryClient.getQueryData<FixedRow>(landingKey);

      const targetCreatedAt = variables.createdAt;
      const nextItem = { ...variables.item, createdAt: targetCreatedAt };

      if (prevFixed) {
        queryClient.setQueryData<FixedRow>(fixedKey, {
          ...prevFixed,
          items: (prevFixed.items ?? []).map((i) => (i.createdAt === targetCreatedAt ? nextItem : i)),
        });
      }
      if (prevLanding) {
        queryClient.setQueryData<FixedRow>(landingKey, {
          ...prevLanding,
          items: (prevLanding.items ?? []).map((i) => (i.createdAt === targetCreatedAt ? nextItem : i)),
        });
      }

      return { prevFixed, prevLanding };
    },

    onError: (_error, _variables, context) => {
      const fixedKey = userAmountQueryKeys.fixedExpenseTable(userId);
      const landingKey = userAmountQueryKeys.landing();

      if (context?.prevFixed) {
        queryClient.setQueryData<FixedRow>(fixedKey, context.prevFixed);
      }
      if (context?.prevLanding) {
        queryClient.setQueryData<FixedRow>(landingKey, context.prevLanding);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userAmountQueryKeys.fixedExpenseTable(userId) });
      queryClient.invalidateQueries({ queryKey: userAmountQueryKeys.landing() });
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

  return useSuspenseQuery({
    queryKey: userAmountQueryKeys.summary(userId, ym),
    queryFn: () => getCurrentMonthAmountSummary(userId),
    refetchOnWindowFocus: false,
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

      await queryClient.cancelQueries({
        queryKey: userAmountQueryKeys.summary(userId, ym),
      });

      const prevSummary = queryClient.getQueryData<AmountSummary>(userAmountQueryKeys.summary(userId, ym));

      if (prevSummary) {
        queryClient.setQueryData<AmountSummary>(userAmountQueryKeys.summary(userId, ym), {
          ...prevSummary,
          totalVariable: prevSummary.totalVariable + amount,
          amountAvailable: prevSummary.amountAvailable - amount,
        });
      }

      return { prevSummary, userId };
    },

    onError: (error, variables, context) => {
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
