"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { Column, Heading } from "@/components/ui";
import { ReadyButton } from "@/features/common/components";
import { FixedExpenseForm, FixedExpenseTotalBoard } from "@/features/expense/components";
import { useFixedExpenseStore } from "@/features/expense/store";

const FixedExpenseList = dynamic(() => import("@/features/expense/components/fixedExpenseList"), {
  ssr: false,
});

export default function ExpensePage() {
  const router = useRouter();
  const items = useFixedExpenseStore((state) => state.items);

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
      <ReadyButton text="다음" condition={items?.length > 0} onClick={() => router.push("/dashboard")} />
    </Column>
  );
}
