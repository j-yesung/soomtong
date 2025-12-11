"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { UserInfo } from "@/features/auth/types";
import { getUserInfo, signInWithGoogle } from "@/supabase/auth";

export const authQuerykeys = {
  info: () => ["info"],
  login: () => ["login"],
};

export function useUserQuery() {
  return useQuery({
    queryKey: authQuerykeys.info(),
    queryFn: () => getUserInfo(),
    initialData: {} as UserInfo,
  });
}

export function useLogin() {
  return useMutation({
    mutationKey: authQuerykeys.login(),
    mutationFn: () => signInWithGoogle(`${window.location.origin}/auth/callback`),
  });
}
