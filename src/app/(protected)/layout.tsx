"use client";

import { useEffect } from "react";

import { useUserQuery } from "@/features/auth/queries";
import { useUserStore } from "@/features/auth/store";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { userInfo, updateUserInfo } = useUserStore();
  const { data } = useUserQuery();

  useEffect(() => {
    if (data) {
      updateUserInfo(data);
    }
  }, [data]);

  if (!userInfo?.id) return null;

  return children;
}
