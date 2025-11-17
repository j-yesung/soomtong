import { useState } from "react";

import { BottomSheet, Button, Column, Row } from "@/components/ui";
import { useUserStore } from "@/features/auth/store";
import { AmountInput, ExpenseQuickButton } from "@/features/common/components";
import { useAddExpenseMutation } from "@/features/common/queries";
import { parseNumericInput } from "@/utils/formatter";

export default function ExpenseAddtScreen() {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const userId = useUserStore((s) => s.userInfo).id;

  const { mutate } = useAddExpenseMutation();

  const handleOnClose = () => {
    setAmount("");
    setBottomSheetOpen(false);
  };

  const handleSubmit = async () => {
    if (!userId || !amount) return;

    mutate({
      userId,
      amount: parseNumericInput(amount),
    });
    handleOnClose();
  };

  return (
    <>
      <ExpenseQuickButton onClick={() => setBottomSheetOpen((v) => !v)} />
      <BottomSheet isOpen={bottomSheetOpen} onClose={handleOnClose} title="지출 등록">
        <Column gap={12}>
          <AmountInput value={amount} onChange={setAmount} />
          <Row gap={8}>
            <Button onClick={handleOnClose} color="danger">
              닫기
            </Button>
            <Button onClick={handleSubmit} disabled={false}>
              등록
            </Button>
          </Row>
        </Column>
      </BottomSheet>
    </>
  );
}
