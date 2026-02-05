import {
  AddExpenseParams,
  AddExpenseResult,
  AmountSummary,
  ExpenseList,
  FixedAddParams,
  FixedRemoveItem,
  FixedRow,
  FixedUpdateItem,
  UpdateBudgetParams,
} from "@/features/expense/types";
import { createClient } from "@/shared/lib/supabase/client";

const supabase = createClient();

/**
 * 고정지출 조회
 */
export async function getFixedExpenseTable(userId: string) {
  const { data, error } = await supabase.from("fixed_expenses").select("*").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return data as FixedRow;
}

/**
 * 고정지출 추가
 */
export async function addFixedItem(params: FixedAddParams) {
  const { userId, item } = params;
  const { data, error } = await supabase.rpc("add_fixed_item", {
    _user: userId,
    _item: item,
  });
  if (error) throw error;
  return (data as FixedRow[])[0];
}

/**
 * 고정지출 삭제
 */
export async function removeFixedItem(params: FixedRemoveItem) {
  const { userId, tag, createdAt } = params;
  const { data, error } = await supabase.rpc("remove_fixed_item", {
    _user: userId,
    _tag: tag,
    _created_at: String(createdAt),
  });
  if (error) throw error;
  return (data as FixedRow[])[0];
}

/**
 * 고정지출 수정
 */
export async function updateFixedItem(params: FixedUpdateItem) {
  const { userId, createdAt, item } = params;

  const { data, error } = await supabase.rpc("update_fixed_item", {
    _user: userId,
    _created_at: String(createdAt),
    _item: item,
  });

  if (error) throw error;
  return (data as FixedRow[])[0];
}

/**
 * 당월 금액 요약 조회
 */
export async function getCurrentMonthAmountSummary(userId: string) {
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
    _billing_start: string;
    _billing_end: string;
  };

  return {
    budget: row._budget,
    fixedTotal: row._fixed_total,
    totalVariable: row._total_variable,
    amountAvailable: row._amount_available,
  } as AmountSummary;
}

/** 지출 추가 + 최신 사용 가능 금액 반환 */
export async function addExpense(params: AddExpenseParams) {
  const { userId, amount, category } = params;

  const { data, error } = await supabase.rpc("add_expense", {
    _user: userId,
    _amount: amount,
    _category: category ?? null,
    _spent_at: null,
  });

  if (data[0] === null) return null;
  if (error) throw error;

  return data?.[0] as AddExpenseResult;
}

/**
 * 지출내역 조회
 */
export async function getExpenseList(userId: string) {
  const { data, error } = await supabase.from("expenses").select("*").eq("user_id", userId);
  if (error) throw error;
  return data as ExpenseList[];
}

/**
 * 월급일자 업데이트
 */
export async function updateBuget(params: UpdateBudgetParams) {
  const { budget, day } = params;
  const { error } = await supabase.rpc("update_fixed_settings", { _budget: budget, _day: day });
  if (error) throw error;
}
