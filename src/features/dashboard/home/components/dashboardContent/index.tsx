import { FixedExpenseList } from "@/features/common/components";
import { useDashboardTabStore } from "@/features/dashboard/home/store";
import HomeScreen from "@/widgets/homeScreen";

export default function DashboardContent() {
  const activeTab = useDashboardTabStore((state) => state.activeTab);

  return activeTab === "home" ? <HomeScreen /> : <FixedExpenseList />;
}
