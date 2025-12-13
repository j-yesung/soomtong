"use client";

import dynamic from "next/dynamic";

import { Column } from "@/components/ui";

import FixedExpenseListScreenSkeleton from "./skeleton";

const FixedExpenseList = dynamic(() => import("@/features/common/components/fixedExpenseList"), {
  ssr: false,
  loading: () => <FixedExpenseListScreenSkeleton />,
});

export default function FixedExpenseListScreen() {
  return (
    <Column gap={8} fullWidth>
      <FixedExpenseList />
    </Column>
  );
}
