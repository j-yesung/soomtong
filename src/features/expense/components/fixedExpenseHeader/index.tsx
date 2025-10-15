import { Column, Heading } from "@/components/ui";

export default function FixedExpenseHeader() {
  return (
    <Column as="header">
      <Heading level={2} fontWeight="bold">
        고정지출을 입력해 주세요
      </Heading>
      <Heading level={5} fontWeight="normal" color="secondary">
        매 월 무엇을 지출하시나요?
      </Heading>
    </Column>
  );
}
