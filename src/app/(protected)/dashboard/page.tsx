import { DashboardContent } from "@/features/dashboard/home/components";
import { isDashboardTab } from "@/features/dashboard/home/store";

interface DashboardPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { tab: requestedTab } = await searchParams;
  const tab = isDashboardTab(requestedTab) ? requestedTab : "home";

  return <DashboardContent initialTab={tab} />;
}
