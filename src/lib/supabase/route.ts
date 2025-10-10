import { NextRequest, NextResponse } from "next/server";

import { createSupabaseWithCookies } from "./factory";

export function getRouteSupabase(req: NextRequest, res: NextResponse) {
  return createSupabaseWithCookies({
    getAll: () => req.cookies.getAll(),
    setAll: (list) => {
      list.forEach(({ name, value, options }) => res.cookies.set({ name, value, ...options }));
    },
  });
}
