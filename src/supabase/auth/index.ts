import { UserInfo } from "@/features/auth/types";
import { createClient } from "@/supabase/client";

const supabase = createClient();

/**
 * 구글 로그인
 */
export async function signInWithGoogle(redirectTo: string, queryParams?: Record<string, string>) {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo, queryParams },
  });
  if (error) throw error;
}

/**
 * 유저 정보 가져오기
 */
export async function getUserInfo() {
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
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;

  return sessionData.session;
}
