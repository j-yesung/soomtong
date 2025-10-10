import { create } from "zustand";

import { AuthActions, AuthState, UserInfo } from "@/features/auth/types";

export const useUserStore = create<AuthState & AuthActions>((set) => ({
  userInfo: {} as UserInfo,
  updateUserInfo: (info) => set(() => ({ userInfo: info })),
}));
