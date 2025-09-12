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
        inputStyle="salary"
        placeholder="월 수입이 얼마인가요?"
        fullWidth
      />
      <Text size={28} weight={800}>
        원
      </Text>
    </Box>
  );
}
