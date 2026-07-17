import { create } from "zustand";

export const DASHBOARD_TABS = ["home", "expense", "expense-analysis", "fixed"] as const;

export type DashboardTab = (typeof DASHBOARD_TABS)[number];

export function isDashboardTab(value: string | undefined): value is DashboardTab {
  return DASHBOARD_TABS.some((tab) => tab === value);
}

interface DashboardState {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
}

export const useDashboardTabStore = create<DashboardState>((set) => ({
  activeTab: "home",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
