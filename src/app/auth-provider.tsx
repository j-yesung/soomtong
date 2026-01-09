"use client";

import { useEffect } from "react";

import { useUserStore } from "@/features/auth/store";
import { createClient } from "@/lib/supabase/client";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const updateUserInfo = useUserStore((s) => s.updateUserInfo);
  const clearUserInfo = useUserStore((s) => s.clearUserInfo);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) clearUserInfo();
      else updateUserInfo(data.user);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      if (!user) clearUserInfo();
      else updateUserInfo(user);
    });

    return () => sub.subscription.unsubscribe();
  }, [updateUserInfo, clearUserInfo]);

  return <>{children}</>;
}
