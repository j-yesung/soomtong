import { createClient } from "@/supabase/client";

/**
 * 유저 예산 초기화
 */
export async function initializeUserBudget() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: existing } = await supabase.from("user_budget").select("user_id").eq("user_id", user.id).maybeSingle();

  if (!existing) {
    await supabase.from("user_budget").insert({
      user_id: user.id,
      email: user.email,
      budget: 0,
    });
  }
}

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

  return userData.user ?? null;
}
