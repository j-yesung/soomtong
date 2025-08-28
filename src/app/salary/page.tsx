"use client";

import { Box, Heading } from "@/components/ui";
import SalaryButton from "@/features/salary/components/salaryButton";
import SalaryInput from "@/features/salary/components/salaryInput";

export default function SalaryPage() {
  return (
    <Box
      as="main"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      height="100vh"
      maxWidth="500px"
      margin="0 auto"
      boxSizing="border-box"
      overflow="hidden"
      position="relative"
      padding={30}
      gap={40}
    >
      <Box as="header">
        <Heading level={2} fontWeight="bold">
          월급을 입력해 주세요
        </Heading>
        <Heading level={5} fontWeight="normal" color="description">
          월 수입을 입력해서 예산을 계획해 보세요
        </Heading>
      </Box>
      <Box display="flex" flexDirection="column" width="100%" gap={20}>
        <SalaryInput />
        <SalaryButton />
      </Box>
    </Box>
  );
}
