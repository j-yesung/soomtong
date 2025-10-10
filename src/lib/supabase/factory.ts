import { type CookieOptions, createServerClient } from "@supabase/ssr";

type CookieRecord = { name: string; value: string; options?: CookieOptions };
type CookieAdapter = {
  getAll: () => {
    name: string;
    value: string;
  }[];
  setAll: (cookies: CookieRecord[]) => void;
};

export function createSupabaseWithCookies(adapter: CookieAdapter) {
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: adapter.getAll,
      setAll: adapter.setAll,
    },
  });
}
