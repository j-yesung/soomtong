"use client";

import dynamic from "next/dynamic";

import { Column } from "@/components/ui";
import {
  FixedExpenseForm,
  FixedExpenseHeader,
  FixedExpenseNextButton,
  FixedExpenseTotalBoard,
} from "@/features/expense/components";

const FixedExpenseList = dynamic(() => import("@/features/expense/components/fixedExpenseList"), {
  ssr: false,
});

export default function ExpensePage() {
  return (
    <Column align="flex-start" gap={18} width="100%">
      <FixedExpenseHeader />
      <FixedExpenseForm />
      <Column gap={8} fullWidth>
        <FixedExpenseTotalBoard />
        <FixedExpenseList />
      </Column>
      <FixedExpenseNextButton />
    </Column>
  );
}
