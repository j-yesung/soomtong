"use client";

import { useRouter } from "next/navigation";

import { Column, Heading } from "@/components/ui";
import { ReadyButton } from "@/features/common/components";
import SalaryInput from "@/features/salary/components/salaryInput";
import { useSalaryStore } from "@/stores/salary/state";

export default function SalaryPage() {
  const router = useRouter();
  const salary = useSalaryStore((state) => state.salary);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/expense");
  };

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
      <Column as="form" gap={20} justify="space-between" onSubmit={handleSubmit}>
        <SalaryInput />
        <ReadyButton type="submit" text="다음" condition={!!salary} />
      </Column>
    </Column>
  );
}
