"use client";

import dynamic from "next/dynamic";

import { Column } from "@/components/ui";

const FixedExpenseListScreen = dynamic(() => import("@/screen/dashboard/fixed/fixedExpenseListScreen"), {
  ssr: false,
  loading: () => <></>,
});

export default function FixedExpenseListPage() {
  return (
    <Column gap={12}>
      <FixedExpenseListScreen />
    </Column>
  );
}
