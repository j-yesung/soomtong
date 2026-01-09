import { type User } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthActions, AuthState } from "@/features/auth/types";

export const useUserStore = create(
  persist<AuthState & AuthActions>(
    (set) => ({
      userInfo: {} as User,
      updateUserInfo: (info) => set(() => ({ userInfo: info })),
      clearUserInfo: () => set(() => ({ userInfo: {} as User })),
    }),
    {
      name: "soomtong-auth-store",
    },
  ),
);
