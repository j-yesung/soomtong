"use client";

import { Column } from "@/components/ui";
import SalaryForm from "@/features/salary/components/salaryForm";
import SalaryHeader from "@/features/salary/components/salaryHeader";

export default function SalaryPage() {
  return (
    <Column gap={40} fullWidth>
      <SalaryHeader />
      <SalaryForm />
    </Column>
  );
}
