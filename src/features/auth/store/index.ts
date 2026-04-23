import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthActions, AuthState } from "@/features/auth/types";

type PersistedAuthState = Pick<AuthState, "userId">;

export const useUserStore = create<AuthState & AuthActions>()(
  persist<AuthState & AuthActions, [], [], PersistedAuthState>(
    (set) => ({
      userId: "",
      isReady: false,
      errorMessage: null,
      setUserId: (id) => set(() => ({ userId: id })),
      setAuthReady: () => set(() => ({ isReady: true, errorMessage: null })),
      setAuthError: (message) => set(() => ({ isReady: true, errorMessage: message })),
      clearUserId: () => set(() => ({ userId: "", isReady: false, errorMessage: null })),
    }),
    {
      name: "soomtong-auth-store",
      version: 1,
      partialize: (state) => ({ userId: state.userId }),
      migrate: (persistedState, version) => {
        if (version === 0) return { userId: "" };
        const state = persistedState as Partial<AuthState>;
        return { userId: typeof state.userId === "string" ? state.userId : "" };
      },
    },
  ),
);
