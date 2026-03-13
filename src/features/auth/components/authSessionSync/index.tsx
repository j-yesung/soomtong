"use client";

import { useEffect } from "react";

import { useUserStore } from "@/features/auth/store";
import { createClient } from "@/shared/lib/supabase/client";
import { hasSupabaseCookie } from "@/shared/utils/auth";

export default function AuthSessionSync() {
  const setUserId = useUserStore((state) => state.setUserId);
  const clearUserId = useUserStore((state) => state.clearUserId);

  useEffect(() => {
    if (!hasSupabaseCookie()) {
      clearUserId();
      return;
    }

    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        return;
      }

      clearUserId();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [clearUserId, setUserId]);

  return null;
}
