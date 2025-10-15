"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { Column } from "@/components/ui";
import { ReadyButton } from "@/features/common/components";
import { FixedExpenseForm, FixedExpenseHeader, FixedExpenseTotalBoard } from "@/features/expense/components";
import { useFixedExpenseStore } from "@/features/expense/store";

const FixedExpenseList = dynamic(() => import("@/features/expense/components/fixedExpenseList"), {
  ssr: false,
});

export default function ExpensePage() {
  const router = useRouter();
  const items = useFixedExpenseStore((state) => state.items);

  return (
    <Column align="flex-start" gap={18} width="100%">
      <FixedExpenseHeader />
      <FixedExpenseForm />
      <Column gap={8} fullWidth>
        <FixedExpenseTotalBoard />
        <FixedExpenseList />
      </Column>
      <ReadyButton text="다음" condition={items?.length > 0} onClick={() => router.push("/dashboard")} />
    </Column>
  );
}
