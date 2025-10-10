"use client";

import { useEffect } from "react";

import { Column } from "@/components/ui";
import { useUserQuery } from "@/features/auth/queries";
import { useUserStore } from "@/features/auth/store";
import SalaryForm from "@/features/salary/components/salaryForm";
import SalaryHeader from "@/features/salary/components/salaryHeader";

export default function SalaryPage() {
  const updateUserInfo = useUserStore((state) => state.updateUserInfo);
  const { data } = useUserQuery();

  useEffect(() => {
    if (data) {
      updateUserInfo(data);
    }
  }, [data]);

  return (
    <Column gap={40} fullWidth>
      <SalaryHeader />
      <SalaryForm />
    </Column>
  );
}
