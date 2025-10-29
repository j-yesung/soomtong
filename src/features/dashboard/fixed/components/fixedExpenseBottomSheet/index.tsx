import { useState } from "react";

import { BottomSheet, Button, Column, Row } from "@/components/ui";
import { FixedExpenseInput } from "@/features/expense/components";
import { FixedItem } from "@/features/expense/types";

type Props = {
  onClose: () => void;
  onClick?: () => void;
  sheetType: "add" | "edit";
  item: FixedItem;
};

export default function FixedExpenseBottomSheet({ onClose, onClick, sheetType, item }: Props) {
  const [changedAmount, setChangedAmount] = useState(
    sheetType === "edit" && item?.amount ? item.amount?.toLocaleString() : "",
  );

  const sheetTitle = sheetType === "add" ? "고정지출 추가" : item.tag;

  return (
    <BottomSheet onClose={onClose} title={sheetTitle}>
      {sheetType === "edit" && (
        <Column gap={12}>
          <FixedExpenseInput value={changedAmount} onChange={setChangedAmount} />
          <Row gap={4} justify="space-between">
            <Button color="danger" onClick={onClose}>
              취소
            </Button>
            <Button onClick={onClick}>적용</Button>
          </Row>
        </Column>
      )}
      {sheetType === "add" && (
        <Row gap={4} justify="space-between">
          <Button color="danger" onClick={onClose}>
            취소
          </Button>
          <Button onClick={onClick}>저장</Button>
        </Row>
      )}
    </BottomSheet>
  );
}
