export const DASHBOARD_PATH = "/dashboard";
export const DASHBOARD_SETTINGS_PATH = `${DASHBOARD_PATH}/settings`;

export function isDashboardSettingsPath(pathname: string) {
  return pathname === DASHBOARD_SETTINGS_PATH;
}

export function isDashboardFormPath(pathname: string) {
  return (
    pathname === `${DASHBOARD_PATH}/budget` ||
    pathname === `${DASHBOARD_PATH}/fixed/new` ||
    /^\/dashboard\/fixed\/[^/]+\/edit$/.test(pathname)
  );
}
