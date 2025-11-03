import { useState } from "react";

import styled from "styled-components";

import { Button, Column, Row } from "@/components/ui";
import { useUserStore } from "@/features/auth/store";
import { AmountInput, SmoothTabs, WheelPicker } from "@/features/common/components";
import { useFixedExpenseRemoveMutation, useFixedExpenseUpdateMutation } from "@/features/common/queries";
import { FixedItem } from "@/features/expense/types";
import { responsiveFormHeights } from "@/styles/viewport";
import { parseNumericInput } from "@/utils/formatter";

import FixedExpenseCategoryList from "../fixedExpenseCategoryList";

type Props = {
  onClose: () => void;
  onChange: (value: string) => void;
  value: string;
  item: FixedItem;
};

export default function FixedExpenseEditForm({ onClose, onChange, value, item }: Props) {
  const [tag, setTag] = useState(item.tag);
  const [day, setDay] = useState(item.day);

  const userId = useUserStore((state) => state.userInfo).id;
  const { mutate: removeExpense } = useFixedExpenseRemoveMutation();
  const { mutate: updateExpense } = useFixedExpenseUpdateMutation();

  const handleUpdate = () => {
    updateExpense({ userId, createdAt: item.createdAt, item: { ...item, tag, amount: parseNumericInput(value), day } });
    onClose();
  };

  const handleRemove = () => {
    removeExpense({ userId, tag, createdAt: item.createdAt });
    onClose();
  };

  return (
    <FormContainer>
      <SmoothTabs tabList={["항목", "금액 입력", "지출일"]}>
        <FixedExpenseCategoryList onClick={(tag) => setTag(tag)} defaultTag={tag} />
        <AmountInput value={value} onChange={onChange} />
        <WheelPicker value={day} onChange={setDay} items={Array.from({ length: 31 }, (_, i) => i + 1)} />
      </SmoothTabs>
      <Row gap={4} justify="space-between">
        <Button onClick={handleUpdate}>수정</Button>
      </Row>
    </FormContainer>
  );
}

const FormContainer = styled(Column)`
  gap: 20px;
  position: relative;
  ${responsiveFormHeights}
`;
