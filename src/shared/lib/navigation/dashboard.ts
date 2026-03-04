import { DashboardTab } from "@/features/dashboard/home/store";

export function navigateToDashboardTab(tab: DashboardTab) {
  window.scrollTo({ top: 0, behavior: "instant" });
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set("tab", tab);
  window.history.replaceState({}, "", newUrl.toString());
}
