import { useState } from "react";

import styled from "styled-components";

import { Button, Column, Row } from "@/components/ui";
import { useUserStore } from "@/features/auth/store";
import { AmountInput, SmoothTabs, WheelPicker } from "@/features/common/components";
import { useFixedExpenseAddMutation } from "@/features/common/queries";
import { responsiveFormHeights } from "@/styles/viewport";

import FixedExpenseCategoryList from "../fixedExpenseCategoryList";

type Props = {
  onClose: () => void;
};

export default function FixedExpenseAddForm({ onClose }: Props) {
  const today = new Date().getDate();

  const [expense, setExpense] = useState("");
  const [day, setDay] = useState(today);

  const userId = useUserStore((state) => state.userInfo).id;

  const { mutate } = useFixedExpenseAddMutation();

  const handleAdd = () => {
    mutate({
      userId,
      item: {
        tag: "라프텔",
        amount: Number(expense.replaceAll(",", "")),
        day,
        createdAt: Date.now(),
      },
    });
    onClose();
  };

  return (
    <FormContainer>
      <SmoothTabs tabList={["항목", "금액 입력", "지출일"]}>
        <FixedExpenseCategoryList />
        <AmountInput value={expense} onChange={setExpense} />
        <WheelPicker
          items={Array.from({ length: 31 }, (_, i) => i + 1)}
          value={day}
          onChange={(d) => setDay?.(d)}
          onActiveChange={(d) => setDay?.(d)}
          visibleCount={7}
        />
      </SmoothTabs>

      <Row gap={4} justify="space-between">
        <Button color="danger" onClick={onClose}>
          취소
        </Button>
        <Button onClick={handleAdd} disabled={!expense}>
          추가
        </Button>
      </Row>
    </FormContainer>
  );
}

const FormContainer = styled(Column)`
  gap: 20px;
  ${responsiveFormHeights}
`;
