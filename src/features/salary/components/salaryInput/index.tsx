import { Box, Input, Text } from "@/components/ui";
import { useSalaryStore } from "@/stores/salary/state";
import { formatNumericInput } from "@/utils/formatter";

export default function SalaryInput() {
  const { salary, setSalary } = useSalaryStore();

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
        fullWidth
      />
      <Text fontSize={28} fontWeight={800}>
        원
      </Text>
    </Box>
  );
}
