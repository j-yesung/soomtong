"use client";

import { useEffect } from "react";

import { useUserStore } from "@/features/auth/store";
import { createClient } from "@/shared/lib/supabase/client";

export default function AuthSessionSync() {
  const updateUserInfo = useUserStore((state) => state.updateUserInfo);
  const clearUserInfo = useUserStore((state) => state.clearUserInfo);

  useEffect(() => {
    const supabase = createClient();

    const syncCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        updateUserInfo(user);
        return;
      }

      clearUserInfo();
    };

    void syncCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        updateUserInfo(session.user);
        return;
      }

      clearUserInfo();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [clearUserInfo, updateUserInfo]);

  return null;
}
