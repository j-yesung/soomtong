import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { Box, Column } from "@/components/ui";
import { userAmountQueryKeys } from "@/features/common/queries";
import { getAmountSummaryServer, getFixedExpenseTableServer } from "@/lib/query/dashboardQueries.server";
import { getQueryClient } from "@/lib/query/getQueryClient";
import { createClient } from "@/lib/supabase/server";
import CalendarScreen from "@/screen/calendar/calendarScreen";
import FixedExpenseListScreen from "@/screen/common/fixedExpenseListScreen";
import { BudgetBoardScreen, DashboardExpenseScreen, FixedExpenseBoardScreen } from "@/screen/dashboard";
import ExpenseAnalysisResultScreen from "@/screen/dashboard/expense/analysisResultScreen";

interface DashboardPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { tab = "home" } = await searchParams;
  const queryClient = getQueryClient();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) return null;

  if (tab === "home") {
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
          {tab === "home" && (
            <>
              <BudgetBoardScreen userId={user.id} />
              <FixedExpenseBoardScreen userId={user.id} />
            </>
          )}
          {tab === "calendar" && <CalendarScreen />}
          {tab === "expense" && <DashboardExpenseScreen />}
          {tab === "expense-analysis" && <ExpenseAnalysisResultScreen />}
          {tab === "fixed" && <FixedExpenseListScreen renderType="dashboard" />}
        </Column>
      </Box>
    </HydrationBoundary>
  );
}
