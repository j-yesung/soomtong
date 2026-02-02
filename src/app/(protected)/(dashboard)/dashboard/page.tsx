import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { Box, Column } from "@/components/ui";
import { userAmountQueryKeys } from "@/features/common/queries";
import { getAmountSummaryServer, getFixedExpenseTableServer } from "@/lib/query/dashboardQueries.server";
import { getQueryClient } from "@/lib/query/getQueryClient";
import { createClient } from "@/lib/supabase/server";
import { BudgetBoardScreen, FixedExpenseBoardScreen } from "@/screen/dashboard";

export default async function DashboardPage() {
  const queryClient = getQueryClient();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.id) {
    const now = new Date();
    const ym = `${now.getFullYear()}-${now.getMonth() + 1}`;

    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: userAmountQueryKeys.summary(user.id, ym),
        queryFn: () => getAmountSummaryServer(user.id),
      }),
      queryClient.prefetchQuery({
        queryKey: userAmountQueryKeys.fixedExpenseTable(user.id),
        queryFn: () => getFixedExpenseTableServer(user.id),
      }),
    ]);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box position="relative">
        <Column gap={12}>
          <BudgetBoardScreen />
          <FixedExpenseBoardScreen />
        </Column>
      </Box>
    </HydrationBoundary>
  );
}
