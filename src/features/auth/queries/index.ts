"use client";

import { useMutation } from "@tanstack/react-query";

import { createClient } from "@/shared/lib/supabase/client";

export const authQuerykeys = {
  login: () => ["login"],
};

export function useLogin() {
  return useMutation({
    mutationKey: authQuerykeys.login(),
    mutationFn: async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback`, queryParams: {} },
      });
      if (error) throw error;
    },
  });
}
