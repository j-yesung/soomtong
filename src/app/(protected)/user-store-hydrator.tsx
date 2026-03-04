"use client";

import { useEffect } from "react";

import { type User } from "@supabase/supabase-js";

import { useUserStore } from "@/features/auth/store";

type Props = {
  user: User;
  children: React.ReactNode;
};

export default function UserStoreHydrator({ user, children }: Props) {
  const updateUserInfo = useUserStore((state) => state.updateUserInfo);

  useEffect(() => {
    updateUserInfo(user);
  }, [user]);

  return <>{children}</>;
}
