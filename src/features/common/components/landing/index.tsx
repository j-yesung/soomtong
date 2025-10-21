"use client";

import { useEffect, useTransition } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Logo from "@/assets/images/soomtong.png";
import { Box } from "@/components/ui";
import { useLandingFixedExpenseQuery } from "@/features/common/queries";

export default function Landing() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const { data } = useLandingFixedExpenseQuery();

  useEffect(() => {
    if (!data) return;

    const next = data.budget ? (data.items.length > 0 ? "/dashboard" : "/expense") : "/salary";

    startTransition(() => {
      router.replace(next);
    });
  }, [data, router]);

  return (
    <>
      {!isPending && (
        <Box centerScreen>
          <Image src={Logo} width={120} height={120} alt="Soomtong Logo" priority />
        </Box>
      )}
    </>
  );
}
