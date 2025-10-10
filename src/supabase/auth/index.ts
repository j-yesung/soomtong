import { UserInfo } from "@/features/auth/types";
import { createClient } from "@/supabase/client";

/**
 * 유저 정보 가져오기
 */
export async function getUserInfo() {
  const supabase = createClient();

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  if (!sessionData.session) return null;

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  return userData.user as UserInfo;
}

/**
 * 유저 세션 정보 가져오기
 */
export async function getUserSession() {
  const supabase = createClient();

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;

  return sessionData.session;
}
