"use client";

import { useEffect } from "react";

import { Column, Heading } from "@/components/ui";
import { useUserQuery } from "@/features/auth/queries";
import { useAuthStore } from "@/features/auth/store";
import SalaryForm from "@/features/salary/components/salaryForm";

export default function SalaryPage() {
  const updateUserInfo = useAuthStore((state) => state.updateUserInfo);
  const { data } = useUserQuery();

  useEffect(() => {
    if (data) {
      updateUserInfo(data);
    }
  }, [data]);

  return (
    <Column gap={40} fullWidth>
      <Column as="header">
        <Heading level={2} fontWeight="bold">
          월급을 입력해 주세요
        </Heading>
        <Heading level={5} fontWeight="normal" color="secondary">
          월 수입을 기반으로 예산을 계획해 보세요
        </Heading>
      </Column>
      <SalaryForm />
    </Column>
  );
}
