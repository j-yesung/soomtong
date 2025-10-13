"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { Column, Heading } from "@/components/ui";
import { ReadyButton } from "@/features/common/components";
import { useFixedExpenseTableQuery } from "@/features/common/queries";
import { FixedExpenseForm, FixedExpenseList, FixedExpenseTotalBoard } from "@/features/expense/components";
import { useFixedExpenseStore } from "@/features/expense/store";

export default function ExpensePage() {
  const router = useRouter();
  const { items, updateItems } = useFixedExpenseStore();
  const { data } = useFixedExpenseTableQuery();

  useEffect(() => {
    if (data) {
      updateItems(data?.items);
    }
  }, [data]);

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
