"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { Column, Heading } from "@/components/ui";
import { ReadyButton } from "@/features/common/components";
import { FixedExpenseForm, FixedExpenseList, FixedExpenseTotalBoard } from "@/features/expense/components";
import { useFixedExpenseStore } from "@/features/expense/store";
import { supabaseBrowser } from "@/lib/supabase/broswer";

export default function ExpensePage() {
  const router = useRouter();
  const items = useFixedExpenseStore((state) => state.items);

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabaseBrowser.auth.getSession();
      if (!session) router.replace("/login"); // 미들웨어가 막아도 방어용
      console.log(session);
      // 필요하면 유저/데이터 fetch → Zustand hydrate
      // const { data: { user } } = await supabaseBrowser.auth.getUser();
    })();
  }, [router]);

  return (
    <Column align="flex-start" gap={18} width="100%">
      <Column as="header">
        <Heading level={2} fontWeight="bold">
          고정지출을 입력해 주세요
        </Heading>
        <Heading level={5} fontWeight="normal" color="secondary">
          매 월 무엇을 지출하시나요?
        </Heading>
      </Column>
      <FixedExpenseForm />
      <Column gap={8} fullWidth>
        <FixedExpenseTotalBoard />
        <FixedExpenseList />
      </Column>
      <ReadyButton text="다음" condition={items.length > 0} onClick={() => router.push("/dashboard")} />
    </Column>
  );
}
