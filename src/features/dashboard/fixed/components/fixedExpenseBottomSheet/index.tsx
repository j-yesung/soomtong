import { useEffect, useState } from "react";

import { BottomSheet, Button, Column, Row } from "@/components/ui";
import { FixedExpenseInput } from "@/features/expense/components";
import { FixedItem } from "@/features/expense/types";

import FixedExpenseAddForm from "../fixedExpenseAddForm";

type Props = {
  onClose: () => void;
  onClick?: () => void;
  open: boolean;
  sheetType: "add" | "edit";
  item: FixedItem;
};

export default function FixedExpenseBottomSheet({ onClose, onClick, open, sheetType, item }: Props) {
  const [changedAmount, setChangedAmount] = useState("");

  useEffect(() => {
    setChangedAmount(sheetType === "edit" && item?.amount ? item.amount?.toLocaleString() : "");
  }, [sheetType, item]);

  const sheetTitle = sheetType === "add" ? "고정지출 추가" : item.tag;

  return (
    <BottomSheet onClose={onClose} isOpen={open} title={sheetTitle}>
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
      {sheetType === "add" && <FixedExpenseAddForm onClose={onClose} />}
    </BottomSheet>
  );
}
