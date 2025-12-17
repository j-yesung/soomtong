import { createClient } from "@/lib/supabase/client";

/**
 * 유저 정보 가져오기
 */
export async function getUserInfo() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) return null;
  return user;
}
