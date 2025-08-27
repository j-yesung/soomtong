import { useState } from "react";

import { Box, Input, Text } from "@/components/ui";

export default function SalaryInput() {
  const [salary, setSalary] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digitsOnly = raw.replace(/\D/g, "");
    const trimmed = digitsOnly.replace(/^0+/, "");
    const formatted = trimmed.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setSalary(formatted);
  };

  return (
    <Box display="flex" gap={8}>
      <Input
        id="salary-input"
        value={salary}
        onChange={handleChange}
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
