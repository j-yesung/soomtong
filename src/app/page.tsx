"use client";

import { useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Logo from "@/assets/images/soomtong.png";
import { Box } from "@/components/ui";
import { getUserInfo, initializeUserBudget } from "@/supabase/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    (async () => {
      const user = await getUserInfo();

      if (!mounted) return;

      const navigateAfterDelay = (path: string) => {
        setTimeout(() => {
          if (mounted) router.replace(path);
        }, 1500);
      };

      if (!user) {
        navigateAfterDelay("/login");
        return;
      }

      try {
        await initializeUserBudget();
        navigateAfterDelay("/salary");
      } catch (e) {
        console.error("유저 초기화 오류:", e);
        navigateAfterDelay("/login");
      }
    })();

    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <Box centerScreen>
      <Image src={Logo} width={120} height={120} alt="Soomtong Logo" priority />
    </Box>
  );
}
