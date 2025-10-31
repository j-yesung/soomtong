import { useState } from "react";

import { styled } from "styled-components";

import { Button, Column, Row } from "@/components/ui";
import { useUserStore } from "@/features/auth/store";
import { AmountInput, SmoothTabs, WheelPicker } from "@/features/common/components";
import { useFixedExpenseAddMutation } from "@/features/common/queries";

import FixedExpenseCategoryList from "../fixedExpenseCategoryList";

type Props = {
  onClose: () => void;
};

const FormContainer = styled(Column)`
  min-height: 320px;
  max-height: 640px;

  @media (min-height: 667px) {
    height: calc(var(--vh, 1vh) * 66);
  }
  @media (min-height: 844px) {
    height: calc(var(--vh, 1vh) * 52);
  }
  @media (min-height: 932px) {
    height: calc(var(--vh, 1vh) * 47);
  }
  @media (min-height: 1024px) {
    height: calc(var(--vh, 1vh) * 38);
  }
  @media (min-height: 1366px) {
    height: calc(var(--vh, 1vh) * 32.5);
  }
`;

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
    <FormContainer gap={20} minHeight={0}>
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
