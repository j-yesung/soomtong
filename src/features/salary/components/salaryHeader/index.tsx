import { Column, Heading } from "@/shared/ui";

export default function SalaryHeader() {
  return (
    <Column as="header">
      <Heading level={2} fontWeight="bold">
        월급을 입력해 주세요
      </Heading>
      <Heading level={5} fontWeight="normal" color="secondary">
        월수입을 기반으로 생활비를 계획해 보세요
      </Heading>
    </Column>
  );
}
