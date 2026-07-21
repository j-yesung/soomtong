import { DashboardTab } from "@/features/dashboard/home/store";

export const DASHBOARD_PATH = "/dashboard";

export const dashboardTabPath = (tab: DashboardTab) => `${DASHBOARD_PATH}?tab=${tab}`;

export function isDashboardFormPath(pathname: string) {
  return (
    pathname === `${DASHBOARD_PATH}/budget` ||
    pathname === `${DASHBOARD_PATH}/fixed/new` ||
    /^\/dashboard\/fixed\/[^/]+\/edit$/.test(pathname)
  );
}
