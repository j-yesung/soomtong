"use client";

import { useEffect } from "react";

import { redirect } from "next/navigation";

import { useUserQuery } from "@/features/auth/queries";
import { useUserStore } from "@/features/auth/store";

export default function Home() {
  const { data } = useUserQuery();
  const { updateUserInfo } = useUserStore();

  useEffect(() => {
    if (data) {
      updateUserInfo(data);
      redirect("/dashboard");
    }
  }, [data]);

  return null;
}
