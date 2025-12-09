"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useLandingFixedExpenseQuery } from "@/features/common/queries";

export default function Landing() {
  const router = useRouter();

  const { data } = useLandingFixedExpenseQuery();

  useEffect(() => {
    if (!data) return;

    const next = data.budget ? (data.items.length > 0 ? "/dashboard" : "/expense") : "/salary";

    router.replace(next);
  }, [data, router]);
}
