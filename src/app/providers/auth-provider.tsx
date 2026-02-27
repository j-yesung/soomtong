"use client";

import { useEffect } from "react";

import { useUserStore } from "@/features/auth/store";
import { createClient } from "@/shared/lib/supabase/client";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const updateUserInfo = useUserStore((state) => state.updateUserInfo);
  const clearUserInfo = useUserStore((state) => state.clearUserInfo);

  useEffect(() => {
    const supabase = createClient();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      if (!user) clearUserInfo();
      else updateUserInfo(user);
    });

    return () => sub.subscription.unsubscribe();
  }, [updateUserInfo, clearUserInfo]);

  return <>{children}</>;
}
