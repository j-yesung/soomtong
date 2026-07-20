"use client";

import { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import { useUserStore } from "@/features/auth/store";
import { AmountInput } from "@/features/common/components";
import { useAddExpenseMutation } from "@/features/common/queries";
import { FixedExpenseCategoryList } from "@/features/dashboard/fixed/components";
import { EXPENSE_CATEGORY_LIST } from "@/shared/config";
import FormScreen from "@/shared/layout/formScreen";
import { dashboardTabPath } from "@/shared/lib/navigation/dashboard";
import { Column, Heading } from "@/shared/ui";
import { parseNumericInput } from "@/shared/utils/formatter";

export default function ExpenseFormScreen() {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const { mutate, isPending } = useAddExpenseMutation();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const isDirty = !!amount || !!category;
  const isSubmitDisabled = !userId || parseNumericInput(amount) < 1 || !category;
  const destination = dashboardTabPath("home");

  const handleLeave = () => router.replace(destination);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitDisabled || isPending) return;

    mutate(
      {
        userId,
        amount: parseNumericInput(amount),
        category,
      },
      { onSuccess: () => router.replace(destination) },
    );
  };

  return (
    <FormScreen
      title="지출 등록"
      description="사용한 금액을 바로 기록해요"
      isDirty={isDirty}
      isSubmitDisabled={isSubmitDisabled}
      isSubmitting={isPending}
      submitLabel="등록하기"
      onLeave={handleLeave}
      onSubmit={handleSubmit}
    >
      <Column gap={24}>
        <Column gap={10}>
          <Heading level={4} fontWeight="bold">
            카테고리
          </Heading>
          <FixedExpenseCategoryList onClick={setCategory} categoryList={EXPENSE_CATEGORY_LIST} />
        </Column>

        <Column gap={10}>
          <Heading as="label" htmlFor="expense-amount" level={4} fontWeight="bold">
            지출 금액
          </Heading>
          <AmountInput id="expense-amount" value={amount} onChange={setAmount} />
        </Column>
      </Column>
    </FormScreen>
  );
}
