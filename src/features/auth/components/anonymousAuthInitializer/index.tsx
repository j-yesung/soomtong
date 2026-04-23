"use client";

import { useEffect } from "react";

import { useUserStore } from "@/features/auth/store";
import { createClient } from "@/shared/lib/supabase/client";

let anonymousAuthPromise: Promise<string> | null = null;

async function getAnonymousUserId() {
  const supabase = createClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) throw sessionError;
  if (session?.user.id) return session.user.id;

  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) throw error;
  if (!data.user?.id) throw new Error("익명 사용자 생성에 실패했어요.");

  return data.user.id;
}

function ensureAnonymousUserId() {
  anonymousAuthPromise ??= getAnonymousUserId();
  return anonymousAuthPromise;
}

export default function AnonymousAuthInitializer() {
  const setUserId = useUserStore((state) => state.setUserId);
  const setAuthReady = useUserStore((state) => state.setAuthReady);
  const setAuthError = useUserStore((state) => state.setAuthError);

  useEffect(() => {
    let isMounted = true;

    ensureAnonymousUserId()
      .then((userId) => {
        if (!isMounted) return;
        setUserId(userId);
        setAuthReady();
      })
      .catch((error) => {
        if (!isMounted) return;
        const message = error instanceof Error ? error.message : "익명 인증에 실패했어요.";
        setAuthError(message);
        console.error("[anonymous auth error]", error);
      });

    return () => {
      isMounted = false;
    };
  }, [setAuthError, setAuthReady, setUserId]);

  return null;
}
