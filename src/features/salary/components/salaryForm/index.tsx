"use client";

import { useState } from "react";

import { Column, Heading, Input, Row, Text } from "@/shared/ui";
import { DatePicker, Keypad, ReadyButton } from "@/features/common/components";
import { useSalaryMutation } from "@/features/salary/queries";
import { parseNumericInput } from "@/shared/utils/formatter";

export default function SalaryForm() {
  const [salary, setSalary] = useState("");
  const [days, setDays] = useState(new Date().getDate());

  const { mutate } = useSalaryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericSalary = parseNumericInput(salary);
    mutate({ salary: numericSalary, day: days });
  };

  return (
    <Column as="form" gap={20} justify="space-between" onSubmit={handleSubmit}>
      <Heading level={3} fontWeight="bold">
        금액
      </Heading>
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
        <ReadyButton type="submit" text="다음" position="none" condition={!!salary && !!days} />
        <Keypad value={salary} onChange={setSalary} />
      </Column>

      <Heading level={3} fontWeight="bold">
        일자 선택
      </Heading>
      <DatePicker selectedDay={days} onChange={setDays} />
    </Column>
  );
}
