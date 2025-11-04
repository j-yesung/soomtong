import { useEffect, useState } from "react";

import styled from "styled-components";

import { Button, Column, Row } from "@/components/ui";
import { AmountInput, SmoothTabs } from "@/features/common/components";
import WheelPicker from "@/features/common/components/wheelPicker";
import { FixedExpenseFormMode, FixedExpenseFormValues } from "@/features/dashboard/fixed/types";
import { FixedItem } from "@/features/expense/types";
import { responsiveFormHeights } from "@/styles/viewport";
import { parseNumericInput } from "@/utils/formatter";

import FixedExpenseCategoryList from "../fixedExpenseCategoryList";

type Props = {
  mode: FixedExpenseFormMode;
  initialItem?: FixedItem;
  onSubmit: (values: FixedExpenseFormValues) => void;
  onClose: () => void;
};

export default function FixedExpenseForm({ mode, initialItem, onSubmit, onClose }: Props) {
  const today = new Date().getDate();

  const [tag, setTag] = useState(initialItem?.tag ?? "");
  const [day, setDay] = useState(initialItem?.day ?? today);
  const [amountInput, setAmountInput] = useState("");

  useEffect(() => {
    if (mode === "edit" && initialItem?.amount) {
      setAmountInput(initialItem.amount.toLocaleString());
    } else {
      setAmountInput("");
    }
    if (initialItem) {
      setTag(initialItem.tag);
      setDay(initialItem.day);
    }
  }, [mode, initialItem]);

  const handleSubmit = () => {
    const amount = parseNumericInput(amountInput);
    onSubmit({ tag, amount, day });
    onClose();
  };

  const isSubmitDisabled = !tag || !amountInput;

  return (
    <FormContainer>
      <SmoothTabs tabList={["항목", "금액 입력", "지출일"]}>
        <FixedExpenseCategoryList onClick={(nextTag) => setTag(nextTag)} defaultTag={tag} />
        <AmountInput value={amountInput} onChange={setAmountInput} />
        <WheelPicker items={Array.from({ length: 31 }, (_, i) => i + 1)} value={day} onChange={setDay} />
      </SmoothTabs>

      <Row gap={8} justify="space-between">
        <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
          {mode === "add" ? "추가" : "수정"}
        </Button>
      </Row>
    </FormContainer>
  );
}

const FormContainer = styled(Column)`
  gap: 20px;
  position: relative;
  ${responsiveFormHeights}
`;
