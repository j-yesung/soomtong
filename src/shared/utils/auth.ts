/**
 * supabase cookie 여부 확인
 */
export function hasSupabaseCookie() {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("sb-") || document.cookie.includes("supabase-");
}
