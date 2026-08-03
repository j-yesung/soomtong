import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useUserStore } from "@/features/auth/store";
import { userAmountQueryKeys } from "@/features/common/queries";
import { resetFinancialData } from "@/supabase/settings";

export function useResetFinancialDataMutation() {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.userId);

  return useMutation({
    mutationKey: ["reset-financial-data"],
    mutationFn: resetFinancialData,
    onSuccess: () => {
      queryClient.setQueryData(userAmountQueryKeys.userProfile(userId), { budget: 0, day: 1 });
      queryClient.setQueryData(userAmountQueryKeys.summary(userId), {
        budget: 0,
        fixedTotal: 0,
        amountAvailable: 0,
      });
      queryClient.setQueryData(userAmountQueryKeys.fixedExpenseTable(userId), null);
      queryClient.removeQueries({ queryKey: ["fixedExpensePayments", userId] });
      toast.success("가계부 데이터를 초기화했어요.");
    },
    onError: () => {
      toast.error("데이터 초기화에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
