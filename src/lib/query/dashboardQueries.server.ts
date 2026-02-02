import { AmountSummary, FixedExpenseTableItem, FixedRow } from "@/features/expense/types";
import { createClient } from "@/lib/supabase/server";

/**
 * 고정 지출 테이블 조회
 */
export async function getFixedExpenseTableServer(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("fixed_expenses").select("*").eq("user_id", userId).maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const fixedRow = data as FixedRow;
  const totalFixedExpense = fixedRow.items?.reduce((acc, cur) => acc + cur.amount, 0) ?? 0;
  const amountAvailable = (fixedRow.budget ?? 0) - totalFixedExpense;

  return {
    ...fixedRow,
    amountAvailable,
    totalFixedExpense,
  } as FixedExpenseTableItem;
}

/**
 * 당월 금액 요약 조회
 */
export async function getAmountSummaryServer(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_current_month_amount_summary", {
    _user: userId,
  });

  if (error) throw error;
  if (!data?.[0]) return null;

  const row = data[0] as {
    _budget: number;
    _fixed_total: number;
    _total_variable: number;
    _amount_available: number;
  };

  return {
    budget: row._budget,
    fixedTotal: row._fixed_total,
    totalVariable: row._total_variable,
    amountAvailable: row._amount_available,
  } as AmountSummary;
}
