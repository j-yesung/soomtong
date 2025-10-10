import { useState } from "react";

import { Column, Input, Row, Text } from "@/components/ui";
import { ReadyButton } from "@/features/common/components";
import { useSalaryMutation } from "@/features/salary/queries";
import { formatNumericInput, parseNumericInput } from "@/utils/formatter";

export default function SalaryForm() {
  const [salary, setSalary] = useState("");
  const { mutate } = useSalaryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericSalary = parseNumericInput(salary);
    mutate(numericSalary);
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(formatNumericInput(e.target.value));
  };

  return (
    <Column as="form" gap={20} justify="space-between" onSubmit={handleSubmit}>
      <Row gap={8}>
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
      </Row>
      <ReadyButton type="submit" text="다음" condition={!!salary} />
    </Column>
  );
}
