"use client";

import { useState } from "react";

import MainLayout from "@/components/layout/mainLayout";
import { Box, Heading, Text } from "@/components/ui";
import ReadyButton from "@/features/common/readyButton";
import ExpensesInput from "@/features/expenses/components/expensesInput";

export default function ExpensesPage() {
  const [value, setValue] = useState("");

  return (
    <MainLayout>
      <Box display="flex" flexDirection="column" alignItems="flex-start" gap={24} width="100%">
        <Heading level={2} fontWeight="bold">
          고정지출을 입력해 주세요
        </Heading>
        <Box display="flex" flexDirection="column" width="100%" gap={24}>
          <ExpensesInput value={value} onChange={setValue} />
          <Box display="flex" flexDirection="column" gap={8}>
            <Text variant="caption" color="secondary">
              카테고리 선택
            </Text>
            <Box display="flex" gap={8}>
              <Text>교통비</Text>
              <Text>식비</Text>
              <Text>문화생활비</Text>
            </Box>
          </Box>
          <ReadyButton onClick={() => {}} text="추가" condition={!!value} />
        </Box>
      </Box>
    </MainLayout>
  );
}
