import { useState } from "react";

import { Box, Input, Text } from "@/components/ui";

export default function SalaryInput() {
  const [salary, setSalary] = useState("");

  return (
    <Box display="flex" gap={8}>
      <Input
        onChange={(e) => setSalary(e.target.value)}
        value={salary}
        id="salary"
        type="number"
        inputMode="numeric"
        inputSize="m"
        inputStyle="salary"
        placeholder="내년엔 더 벌자"
      />
      <Text fontSize={28} fontWeight={800}>
        원
      </Text>
    </Box>
  );
}
