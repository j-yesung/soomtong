"use client";

import { useEffect } from "react";

import type { User } from "@supabase/supabase-js";

import { useUserStore } from "@/features/auth/store";

export default function StoreHydrator({ user }: { user: User }) {
  const updateUserInfo = useUserStore((state) => state.updateUserInfo);

  useEffect(() => {
    updateUserInfo(user);
  }, [user.id]);

  return null;
}
