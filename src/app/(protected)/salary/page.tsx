"use client";

import { Column } from "@/components/ui";
import { SalaryForm, SalaryHeader } from "@/features/salary/components";

export default function SalaryPage() {
  return (
    <Column gap={40} fullWidth>
      <SalaryHeader />
      <SalaryForm />
    </Column>
  );
}
