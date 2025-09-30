"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Column, Heading, Input, Row, Text } from "@/components/ui";
import { ReadyButton } from "@/features/common/components";
import { formatNumericInput } from "@/utils/formatter";

export default function SalaryPage() {
  const [salary, setSalary] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/expense");
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(formatNumericInput(e.target.value));
  };

  return (
    <Column gap={40} fullWidth>
      <Column as="header">
        <Heading level={2} fontWeight="bold">
          월급을 입력해 주세요
        </Heading>
        <Heading level={5} fontWeight="normal" color="secondary">
          월 수입을 기반으로 예산을 계획해 보세요
        </Heading>
      </Column>
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
    </Column>
  );
}
