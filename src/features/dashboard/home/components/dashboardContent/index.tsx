import { FixedExpenseList } from "@/features/common/components";
import { useDashboardTabStore } from "@/features/dashboard/home/store";
import HomeScreen from "@/widgets/homeScreen";
import SettingsScreen from "@/widgets/settingsScreen";

export default function DashboardContent() {
  const activeTab = useDashboardTabStore((state) => state.activeTab);

  if (activeTab === "home") return <HomeScreen />;
  if (activeTab === "fixed") return <FixedExpenseList />;
  return <SettingsScreen />;
}
