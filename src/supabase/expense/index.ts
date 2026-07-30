import {
  AmountSummary,
  FixedAddParams,
  FixedExpensePayment,
  FixedExpensePaymentSchedule,
  FixedRemoveItem,
  FixedRow,
  FixedUpdateItem,
  ToggleFixedExpensePaymentParams,
  UpdateBudgetParams,
} from "@/features/common/types";
import { getFixedExpensePaymentStatus } from "@/shared/utils/date";
import { createClient } from "@/shared/lib/supabase/client";

const supabase = createClient();

/**
 * 사용자 설정 조회 (예산, 월급날)
 */
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("user_profile")
    .select("budget, salary_day")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return {
    budget: data?.budget ?? 0,
    day: data?.salary_day ?? 1,
  };
}

/**
 * 고정지출 조회
 */
export async function getFixedExpenseTable(userId: string) {
  const { data, error } = await supabase.from("fixed_expenses").select("*").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return data as FixedRow | null;
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
 * 고정지출 납부 완료 내역 조회
 */
export async function getFixedExpensePayments(userId: string, schedules: FixedExpensePaymentSchedule[]) {
  if (schedules.length === 0) return [];

  const dueToday = schedules.filter(
    (schedule) => getFixedExpensePaymentStatus(schedule.dueDate, false) === "dueToday",
  );

  if (dueToday.length > 0) {
    const { error } = await supabase.from("fixed_expense_payments").upsert(
      dueToday.map((schedule) => ({
        user_id: userId,
        fixed_item_created_at: schedule.fixedItemCreatedAt,
        due_date: schedule.dueDate,
      })),
      {
        onConflict: "user_id,fixed_item_created_at,due_date",
        ignoreDuplicates: true,
      },
    );

    if (error) throw error;
  }

  const dueDates = Array.from(new Set(schedules.map((schedule) => schedule.dueDate)));

  const { data, error } = await supabase
    .from("fixed_expense_payments")
    .select("fixed_item_created_at, due_date, paid_at")
    .eq("user_id", userId)
    .in("due_date", dueDates);

  if (error) throw error;

  return (data ?? []).map((item) => ({
    fixedItemCreatedAt: Number(item.fixed_item_created_at),
    dueDate: item.due_date,
    paidAt: item.paid_at,
  })) as FixedExpensePayment[];
}

/**
 * 고정지출 납부 완료 토글
 */
export async function toggleFixedExpensePayment(params: ToggleFixedExpensePaymentParams) {
  const { userId, fixedItemCreatedAt, dueDate, isPaid } = params;

  if (isPaid) {
    const { error } = await supabase
      .from("fixed_expense_payments")
      .update({ paid_at: null })
      .eq("user_id", userId)
      .eq("fixed_item_created_at", fixedItemCreatedAt)
      .eq("due_date", dueDate);

    if (error) throw error;
    return null;
  }

  const { data, error } = await supabase
    .from("fixed_expense_payments")
    .upsert(
      {
        user_id: userId,
        fixed_item_created_at: fixedItemCreatedAt,
        due_date: dueDate,
        paid_at: new Date().toISOString(),
      },
      { onConflict: "user_id,fixed_item_created_at,due_date" },
    )
    .select("fixed_item_created_at, due_date, paid_at")
    .single();

  if (error) throw error;

  return {
    fixedItemCreatedAt: Number(data.fixed_item_created_at),
    dueDate: data.due_date,
    paidAt: data.paid_at,
  } as FixedExpensePayment;
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
    _amount_available: number;
  };

  return {
    budget: row._budget,
    fixedTotal: row._fixed_total,
    amountAvailable: row._amount_available,
  } as AmountSummary;
}

/**
 * 월급일자 업데이트
 */
export async function updateBudget(params: UpdateBudgetParams) {
  const { userId, budget, day } = params;
  const { error } = await supabase.rpc("update_user_settings", {
    _user_id: userId,
    _budget: budget,
    _day: day,
  });
  if (error) throw error;
}
