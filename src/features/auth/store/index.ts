"use client";

import type { User } from "@supabase/supabase-js";
import { create } from "zustand";

import { AuthActions, AuthState } from "@/features/auth/types";

export const useUserStore = create<AuthState & AuthActions>((set) => ({
  userInfo: {} as User,
  updateUserInfo: (info) => set(() => ({ userInfo: info })),
}));
