import { createClient } from "../client";

const supabase = createClient();

/**
 * 월수입 저장 또는 업데이트
 * @param salary - 월수입
 */
export async function insertUserSalary(salary: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { data, error } = await supabase
    .from("fixed_expenses")
    .upsert(
      {
        user_id: user.id,
        budget: salary,
      },
      { onConflict: "user_id" },
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}
