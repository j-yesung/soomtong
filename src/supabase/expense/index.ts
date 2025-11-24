import {
  AddExpenseParams,
  AddExpenseResult,
  AmountSummary,
  FixedAddParams,
  FixedRemoveItem,
  FixedRow,
  FixedUpdateItem,
} from "@/features/expense/types";
import { createClient } from "@/supabase/client";

const supabase = createClient();

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
    budget: number;
    total_fixed: number;
    total_variable: number;
    amount_available: number;
  };

  const result: AmountSummary = {
    budget: row.budget,
    totalFixed: row.total_fixed,
    totalVariable: row.total_variable,
    amountAvailable: row.amount_available,
  };

  return result;
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
