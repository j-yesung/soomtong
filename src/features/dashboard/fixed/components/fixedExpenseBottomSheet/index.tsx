import { useEffect, useState } from "react";

import { BottomSheet } from "@/components/ui";
import { FixedItem } from "@/features/expense/types";

import FixedExpenseAddForm from "../fixedExpenseAddForm";
import FixedExpenseEditForm from "../fixedExpenseEditForm";

type Props = {
  onClose: () => void;
  open: boolean;
  sheetType: "add" | "edit";
  item: FixedItem;
};

export default function FixedExpenseBottomSheet({ onClose, open, sheetType, item }: Props) {
  const [changedAmount, setChangedAmount] = useState("");

  useEffect(() => {
    setChangedAmount(sheetType === "edit" && item?.amount ? item.amount?.toLocaleString() : "");
  }, [sheetType, item]);

  const sheetTitle = sheetType === "add" ? "고정지출 추가" : item.tag;

  return (
    <BottomSheet onClose={onClose} isOpen={open} title={sheetTitle}>
      {sheetType === "edit" && (
        <FixedExpenseEditForm onClose={onClose} onChange={setChangedAmount} value={changedAmount} item={item} />
      )}
      {sheetType === "add" && <FixedExpenseAddForm onClose={onClose} />}
    </BottomSheet>
  );
}
