import { useEffect, useState } from "react";

import { FixedItem } from "@/features/common/types";
import { FixedExpenseFormMode, FixedExpenseFormValues } from "@/features/dashboard/fixed/types";
import { FIXED_EXPENSE_CATEGORY_LIST } from "@/shared/config";
import { Button, Column, Heading, Row } from "@/shared/ui";
import { Input } from "@/shared/ui";
import { parseNumericInput } from "@/shared/utils/formatter";

import AmountInput from "../amountInput";
import * as S from "./style";

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
    <Column gap={16} fullWidth>
      <Column gap={10}>
        <Heading level={3} fontWeight="bold">
          지출 정보
        </Heading>
        <S.SelectFields>
          <S.SelectField>
            <S.FieldLabel>납부일</S.FieldLabel>
            <S.SelectControl>
              <S.NativeSelect value={day} onChange={(event) => setDay(Number(event.target.value))} aria-label="납부일">
                {Array.from({ length: 31 }, (_, index) => index + 1).map((date) => (
                  <option key={date} value={date}>
                    {date}일
                  </option>
                ))}
              </S.NativeSelect>
              <S.SelectIcon size={16} aria-hidden />
            </S.SelectControl>
          </S.SelectField>
          <S.SelectField>
            <S.FieldLabel>카테고리</S.FieldLabel>
            <S.SelectControl>
              <S.NativeSelect value={tag} onChange={(event) => setTag(event.target.value)} aria-label="카테고리">
                <option value="" disabled>
                  선택
                </option>
                {FIXED_EXPENSE_CATEGORY_LIST.map(({ name }) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </S.NativeSelect>
              <S.SelectIcon size={16} aria-hidden />
            </S.SelectControl>
          </S.SelectField>
        </S.SelectFields>
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
          placeholder="메모를 입력해 주세요. (선택)"
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
