import { useEffect, useState } from "react";

import { FixedExpenseCategoryList } from "@/features/dashboard/fixed/components";
import { FixedExpenseFormMode, FixedExpenseFormValues } from "@/features/dashboard/fixed/types";
import { FixedItem } from "@/features/expense/types";
import { DEFAULT_TAG_LIST } from "@/shared/config";
import { Button, Column, Heading, Row } from "@/shared/ui";
import { Input } from "@/shared/ui";
import { parseNumericInput } from "@/shared/utils/formatter";

import AmountInput from "../amountInput";
import DatePicker from "../datePicker";

type Props = {
  onClose: () => void;
  onSubmit: (values: FixedExpenseFormValues) => void;
  initialItem?: FixedItem;
  formType: FixedExpenseFormMode;
};

export default function FixedExpenseForm({ onClose, onSubmit, initialItem, formType }: Props) {
  const today = new Date().getDate();

  const [tag, setTag] = useState(initialItem?.tag ?? "");
  const [day, setDay] = useState(initialItem?.day ?? today);
  const [amountInput, setAmountInput] = useState("");
  const [memo, setMemo] = useState(initialItem?.memo ?? "");

  useEffect(() => {
    if (formType === "edit" && initialItem?.amount) {
      setAmountInput(initialItem.amount.toLocaleString());
    } else {
      setAmountInput("");
    }
    if (initialItem) {
      setTag(initialItem.tag);
      setDay(initialItem.day);
      setMemo(initialItem.memo ?? "");
    }
  }, [formType, initialItem]);

  const handleSubmit = () => {
    const amount = parseNumericInput(amountInput);
    onSubmit({ tag, amount, day, memo });
    onClose();
  };

  const isSubmitDisabled = !tag || !amountInput;

  return (
    <Column gap={24} fullWidth>
      <Column gap={10}>
        <Heading level={3} fontWeight="bold">
          지출일
        </Heading>
        <DatePicker selectedDay={day} onChange={setDay} />
      </Column>
      <Column gap={10}>
        <Heading level={3} fontWeight="bold">
          카테고리
        </Heading>
        <FixedExpenseCategoryList
          onClick={(nextTag) => setTag(nextTag)}
          defaultTag={tag}
          categoryList={DEFAULT_TAG_LIST}
        />
      </Column>
      <Column gap={10}>
        <Heading level={3} fontWeight="bold">
          지출 금액
        </Heading>
        <AmountInput value={amountInput} onChange={setAmountInput} />
      </Column>
      <Column gap={10}>
        <Heading level={3} fontWeight="bold">
          메모
        </Heading>
        <Input
          id="memo"
          value={memo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMemo(e.target.value)}
          placeholder="메모를 입력해주세요 (선택)"
          fullWidth
        />
      </Column>
      <Row gap={8} justify="space-between">
        <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
          {formType === "add" ? "추가" : "수정"}
        </Button>
      </Row>
    </Column>
  );
}
