"use client";

import { useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Logo from "@/assets/images/soomtong.png";
import { Box } from "@/components/ui";
import { hasSupabaseCookie } from "@/utils/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    let active = true;
    const isCookie = hasSupabaseCookie();

    setTimeout(() => {
      if (!active) return;
      router.replace(isCookie ? "/salary" : "/login");
    }, 1500);

    return () => {
      active = false;
    };
  }, [router]);

  return (
    <Box centerScreen>
      <Image src={Logo} width={120} height={120} alt="Soomtong Logo" priority />
    </Box>
  );
}
