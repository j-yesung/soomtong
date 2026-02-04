import { create } from "zustand";

export type DashboardTab = "home" | "calendar" | "expense" | "expense-analysis" | "fixed";

interface DashboardState {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
}

export const useDashboardTabStore = create<DashboardState>((set) => ({
  activeTab: "home",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
