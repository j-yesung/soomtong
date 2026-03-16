import { DashboardContent } from "@/features/dashboard/home/components";
import { DashboardTab } from "@/features/dashboard/home/store";

interface DashboardPageProps {
  searchParams: Promise<{ tab?: DashboardTab }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { tab = "home" } = await searchParams;
  return <DashboardContent initialTab={tab} />;
}
