"use client";

import MainLayout from "@/components/layout/mainLayout";
import { Column, Heading } from "@/components/ui";
import { FixedExpenseForm, FixedExpenseList } from "@/features/expense/components";

export default function ExpensePage() {
  return (
    <MainLayout>
      <Column align="flex-start" gap={24} width="100%">
        <Heading level={2} fontWeight="bold">
          고정지출을 입력해 주세요
        </Heading>
        <FixedExpenseForm />
        <FixedExpenseList />
      </Column>
    </MainLayout>
  );
}
