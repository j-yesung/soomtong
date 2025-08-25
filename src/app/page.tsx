"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.push("/salary")}>시작하기</Button>
    </div>
  );
}
