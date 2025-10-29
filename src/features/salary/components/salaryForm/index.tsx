"use client";

import { useState } from "react";

import { Column, Input, Row, Text } from "@/components/ui";
import { ReadyButton } from "@/features/common/components";
import MoneyPadSection from "@/features/common/components/keypad";
import { useSalaryMutation } from "@/features/salary/queries";
import { parseNumericInput } from "@/utils/formatter";

export default function SalaryForm() {
  const [salary, setSalary] = useState("");
  const { mutate } = useSalaryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericSalary = parseNumericInput(salary);
    mutate(numericSalary);
  };

  return (
    <Column as="form" gap={20} justify="space-between" onSubmit={handleSubmit}>
      <Row gap={8}>
        <Input
          id="salary-input"
          value={salary}
          onFocus={(e) => e.currentTarget.blur()}
          inputMode="none"
          inputStyle="salary"
          placeholder="월 수입이 얼마인가요?"
          fullWidth
          readOnly
        />
        <Text size={28} weight={800}>
          원
        </Text>
      </Row>
      <Column gap={12} bottom={0} position="absolute" align="center" fullWidth>
        <ReadyButton type="submit" text="다음" position="none" condition={!!salary} />
        <MoneyPadSection value={salary} onChange={setSalary} />
      </Column>
    </Column>
  );
}
