import { Button, Column, Row } from "@/components/ui";
import { SmoothTabs } from "@/features/common/components";
import { FixedExpenseListFormScreen } from "@/screen/dashboard";

type Props = {
  onClose: () => void;
};

export default function FixedExpenseAddForm({ onClose }: Props) {
  return (
    <Column gap={20}>
      <SmoothTabs tabList={["금액 입력", "지출일"]}>
        <FixedExpenseListFormScreen />
        <div>지출일 선택</div>
      </SmoothTabs>

      <Row gap={4} justify="space-between">
        <Button color="danger" onClick={onClose}>
          취소
        </Button>
        <Button onClick={() => {}}>저장</Button>
      </Row>
    </Column>
  );
}
