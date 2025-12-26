import { useState } from "react";

import { BottomSheet, Button, Column, Row, Text } from "@/components/ui";
import { EXPENSE_CATEGORY_LIST } from "@/constants";
import { useUserStore } from "@/features/auth/store";
import { AmountInput, ExpenseQuickButton } from "@/features/common/components";
import { useAddExpenseMutation } from "@/features/common/queries";
import { FixedExpenseCategoryList } from "@/features/dashboard/fixed/components";
import { parseNumericInput } from "@/utils/formatter";

export default function ExpenseAddtScreen() {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

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
      category,
    });
    handleOnClose();
  };

  return (
    <>
      <ExpenseQuickButton onClick={() => setBottomSheetOpen((v) => !v)} />
      <BottomSheet isOpen={bottomSheetOpen} onClose={handleOnClose} title="지출 등록">
        <Column gap={12}>
          <Text size={16} weight={700}>
            항목
          </Text>
          <FixedExpenseCategoryList
            onClick={(category) => setCategory(category)}
            categoryList={EXPENSE_CATEGORY_LIST}
          />
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
