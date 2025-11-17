import { useState } from "react";

import { BottomSheet, Button, Column, Row } from "@/components/ui";
import { AmountInput, ExpenseQuickButton } from "@/features/common/components";

export default function ExpenseAlertScreen() {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const handleOnClose = () => {
    setAmount("");
    setBottomSheetOpen(false);
  };

  return (
    <>
      <ExpenseQuickButton onClick={() => setBottomSheetOpen(!bottomSheetOpen)} />
      <BottomSheet isOpen={bottomSheetOpen} onClose={handleOnClose} title="지출 등록">
        <Column gap={12}>
          <AmountInput value={amount} onChange={setAmount} />
          <Row gap={8}>
            <Button onClick={handleOnClose} color="danger">
              닫기
            </Button>
            <Button>등록</Button>
          </Row>
        </Column>
      </BottomSheet>
    </>
  );
}
