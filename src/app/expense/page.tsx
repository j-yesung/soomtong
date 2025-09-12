"use client";

import { Column, Heading } from "@/components/ui";
import { FixedExpenseForm, FixedExpenseList, FixedExpenseTotalBoard } from "@/features/expense/components";

export default function ExpensePage() {
  return (
    <Column align="flex-start" gap={18} width="100%">
      <Heading level={2} fontWeight="bold">
        고정지출을 입력해 주세요
      </Heading>
      <FixedExpenseForm />
      <Column gap={8} fullWidth>
        <FixedExpenseTotalBoard />
        <FixedExpenseList />
      </Column>
    </Column>
  );
}
