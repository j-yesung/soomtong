"use client";

import { useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Logo from "@/assets/images/soomtong.png";
import { Row } from "@/components/ui";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const timer = setTimeout(() => {
      if (!mounted) return;
      router.replace("/salary");
    }, 1500);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <Row align="center" justify="center" fullWidth>
      <Image src={Logo} width={120} height={120} alt="Soomtong Logo" priority />
    </Row>
  );
}
