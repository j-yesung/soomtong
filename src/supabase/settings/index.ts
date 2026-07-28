import { createClient } from "@/shared/lib/supabase/client";

const supabase = createClient();

export async function resetFinancialData() {
  const { error } = await supabase.rpc("reset_financial_data");
  if (error) throw error;
}
