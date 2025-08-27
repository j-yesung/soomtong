"use client";

import { Box, Button, Heading, Input } from "@/components/ui";

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
        <Input
          onChange={() => {}}
          id="salary"
          type="number"
          inputMode="numeric"
          inputSize="m"
          variant="underline"
          inputStyle="salary"
          placeholder="내년엔 더 벌자"
        />
        <Button onClick={() => {}} fullWidth>
          다음
        </Button>
      </Box>
    </Box>
  );
}
