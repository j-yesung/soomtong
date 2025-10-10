import { cookies } from "next/headers";

import { createSupabaseWithCookies } from "./factory";

export async function getServerSupabaseRSC() {
  const store = await cookies();
  return createSupabaseWithCookies({
    getAll: () => store.getAll().map(({ name, value }) => ({ name, value })),
    setAll: () => {},
  });
}
