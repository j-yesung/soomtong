import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthActions, AuthState } from "@/features/auth/types";

export const useUserStore = create(
  persist<AuthState & AuthActions>(
    (set) => ({
      userId: "",
      setUserId: (id) => set(() => ({ userId: id })),
      clearUserId: () => set(() => ({ userId: "" })),
    }),
    {
      name: "soomtong-auth-store",
    },
  ),
);
