"use client";

import { Button, Heading, Input } from "@/components/ui";

import * as S from "./style";

export default function SalaryPage() {
  return (
    <S.SalaryContainer>
      <Heading level={2} fontWeight="bold">
        월 수입을 입력해 주세요
      </Heading>
      {/* <Heading level={5} fontWeight="normal" color="description">
        월 수입을 입력해서 생활비를 계산해 보세요
      </Heading> */}
      <Input
        onChange={() => {}}
        id="salary"
        type="number"
        inputMode="numeric"
        inputSize="m"
        variant="underline"
        inputStyle="salary"
        placeholder="월 수입을 입력해 주세요"
      />
      <Button onClick={() => {}} fullWidth>
        입력 완료
      </Button>
    </S.SalaryContainer>
  );
}
