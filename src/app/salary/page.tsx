"use client";

import { useRouter } from "next/navigation";

import MainLayout from "@/components/layout/mainLayout";
import { Box, Heading } from "@/components/ui";
import ReadyButton from "@/features/common/readyButton";
import SalaryInput from "@/features/salary/components/salaryInput";
import { useSalaryStore } from "@/stores/salary/state";

export default function SalaryPage() {
  const router = useRouter();
  const salary = useSalaryStore((state) => state.salary);

  return (
    <MainLayout>
      <Box display="flex" flexDirection="column" gap={40} width="100%">
        <Box as="header">
          <Heading level={2} fontWeight="bold">
            월급을 입력해 주세요
          </Heading>
          <Heading level={5} fontWeight="normal" color="description">
            월 수입을 기반으로 예산을 계획해 보세요
          </Heading>
        </Box>
        <Box display="flex" flexDirection="column" gap={20}>
          <SalaryInput />
          <ReadyButton onClick={() => router.push("/expense")} text="다음" condition={!!salary} />
        </Box>
      </Box>
    </MainLayout>
  );
}
