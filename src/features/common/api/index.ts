import { FixedRow } from "@/features/expense/types";
import { SOOMTONG_API } from "@/lib/axios";

export async function getFixedExpenseTable() {
  const { data } = await SOOMTONG_API.get<FixedRow>("/api/fixed");
  return data;
}
