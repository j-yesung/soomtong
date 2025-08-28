import { useState } from "react";

import { Box, Input, Text } from "@/components/ui";
import { formatNumericInput } from "@/utils/formatter";

export default function SalaryInput() {
  const [salary, setSalary] = useState("");

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(formatNumericInput(e.target.value));
  };

  return (
    <Box display="flex" gap={8}>
      <Input
        id="salary-input"
        value={salary}
        onChange={handleSalaryChange}
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
