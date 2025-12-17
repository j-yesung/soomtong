"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { createClient } from "@/lib/supabase/client";
import { getUserInfo } from "@/supabase/auth";

export const authQuerykeys = {
  info: () => ["user-info"],
  login: () => ["login"],
};

export function useUserQuery() {
  return useQuery({
    queryKey: authQuerykeys.info(),
    queryFn: () => getUserInfo(),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}

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
