import { cookies } from "next/headers";

import { createSupabaseWithCookies } from "./factory";

export async function getServerSupabaseAction() {
  const store = await cookies();
  return createSupabaseWithCookies({
    getAll: () => store.getAll().map(({ name, value }) => ({ name, value })),
    setAll: (list) => {
      list.forEach(({ name, value, options }) => store.set({ name, value, ...options }));
    },
  });
}
