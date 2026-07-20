import { DashboardTab } from "@/features/dashboard/home/store";

export const DASHBOARD_PATH = "/dashboard";

export const dashboardTabPath = (tab: DashboardTab) => `${DASHBOARD_PATH}?tab=${tab}`;

export function isDashboardFormPath(pathname: string) {
  return (
    pathname === `${DASHBOARD_PATH}/budget` ||
    pathname === `${DASHBOARD_PATH}/expense/new` ||
    pathname === `${DASHBOARD_PATH}/fixed/new` ||
    /^\/dashboard\/fixed\/[^/]+\/edit$/.test(pathname)
  );
}

export function navigateToDashboardTab(tab: DashboardTab) {
  window.scrollTo({ top: 0, behavior: "instant" });
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set("tab", tab);
  window.history.replaceState({}, "", newUrl.toString());
}
