import { createClient } from "../client";

/**
 * 월수입 저장 또는 업데이트
 * @param salary - 월 수입
 */
export async function insertUserSalary(salary: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data, error } = await supabase
    .from("user_budget")
    .upsert(
      {
        user_id: user.id,
        email: user.email,
        budget: salary,
      },
      { onConflict: "user_id" },
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}
