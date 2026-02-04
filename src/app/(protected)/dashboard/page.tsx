import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { userAmountQueryKeys } from "@/features/common/queries";
import { DashboardContent } from "@/features/dashboard/home/components";
import { DashboardTab } from "@/features/dashboard/home/store";
import { getAmountSummaryServer, getFixedExpenseTableServer } from "@/lib/query/dashboardQueries.server";
import { getQueryClient } from "@/lib/query/getQueryClient";
import { createClient } from "@/lib/supabase/server";

interface DashboardPageProps {
  searchParams: Promise<{ tab?: DashboardTab }>;
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
      <DashboardContent initialTab={tab} userId={user.id} />
    </HydrationBoundary>
  );
}
