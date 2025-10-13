import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "@/features/auth/store";
import { fetchFixedRow } from "@/supabase/expense";

export const fixedExpenseQueryKeys = {
  all: () => ["fixedExpense"],
};

export function useFixedExpenseQuery() {
  const userInfo = useUserStore((state) => state.userInfo);

  return useQuery({
    queryKey: fixedExpenseQueryKeys.all(),
    queryFn: () => fetchFixedRow({ userId: userInfo.id }),
    refetchOnWindowFocus: false,
    enabled: !!userInfo.id,
  });
}
