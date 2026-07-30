export const DASHBOARD_PATH = "/dashboard";

export function isDashboardFormPath(pathname: string) {
  return (
    pathname === `${DASHBOARD_PATH}/budget` ||
    pathname === `${DASHBOARD_PATH}/fixed/new` ||
    /^\/dashboard\/fixed\/[^/]+\/edit$/.test(pathname)
  );
}
