/**
 * supabase cookie 여부 확인
 */
export function hasSupabaseCookie() {
  return document.cookie.includes("sb-");
}
