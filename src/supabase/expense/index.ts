import { FixedAddParams, FixedRow } from "@/features/expense/types";
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
export async function removeFixedItem(params: { userId: string; tag: string; createdAt: number }) {
  const { userId, tag, createdAt } = params;
  const { data, error } = await supabase.rpc("remove_fixed_item", {
    _user: userId,
    _tag: tag,
    _created_at: String(createdAt),
  });
  if (error) throw error;
  return (data as FixedRow[])[0];
}
