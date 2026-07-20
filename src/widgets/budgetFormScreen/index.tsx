"use client";

import { FormEvent, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useUserStore } from "@/features/auth/store";
import { AmountInput, DatePicker } from "@/features/common/components";
import { useUpdateBudgetMutation, useUserProfileQuery } from "@/features/common/queries";
import FormScreen from "@/shared/layout/formScreen";
import { dashboardTabPath } from "@/shared/lib/navigation/dashboard";
import { Column, Heading, Skeleton } from "@/shared/ui";
import { formatWithComma, parseNumericInput } from "@/shared/utils/formatter";

export default function BudgetFormScreen() {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const { data, isFetched } = useUserProfileQuery(userId);
  const { mutate, isPending } = useUpdateBudgetMutation();

  const [budget, setBudget] = useState("");
  const [budgetDay, setBudgetDay] = useState(1);
  const [initialBudget, setInitialBudget] = useState("");
  const [initialBudgetDay, setInitialBudgetDay] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isFetched || isInitialized) return;

    const nextBudget = formatWithComma(data?.budget ?? "");
    const nextBudgetDay = data?.day ?? 1;

    setBudget(nextBudget);
    setBudgetDay(nextBudgetDay);
    setInitialBudget(nextBudget);
    setInitialBudgetDay(nextBudgetDay);
    setIsInitialized(true);
  }, [data, isFetched, isInitialized]);

  const isDirty = isInitialized && (budget !== initialBudget || budgetDay !== initialBudgetDay);
  const isSubmitDisabled = !userId || !isInitialized || parseNumericInput(budget) < 1;
  const destination = dashboardTabPath("home");

  const handleLeave = () => router.replace(destination);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitDisabled || isPending) return;

    mutate(
      {
        userId,
        budget: parseNumericInput(budget),
        day: budgetDay,
      },
      { onSuccess: () => router.replace(destination) },
    );
  };

  return (
    <FormScreen
      title={data?.budget ? "월수입 변경" : "월수입 추가"}
      description="이번 달 생활비의 기준을 설정해요"
      isDirty={isDirty}
      isSubmitDisabled={isSubmitDisabled}
      isSubmitting={isPending}
      submitLabel={data?.budget ? "변경하기" : "추가하기"}
      onLeave={handleLeave}
      onSubmit={handleSubmit}
    >
      {isInitialized ? (
        <Column gap={24}>
          <Column gap={10}>
            <Heading as="label" htmlFor="budget-amount" level={4} fontWeight="bold">
              월수입
            </Heading>
            <AmountInput id="budget-amount" value={budget} onChange={setBudget} />
          </Column>

          <Column gap={10}>
            <Heading level={4} fontWeight="bold">
              지급일
            </Heading>
            <DatePicker selectedDay={budgetDay} onChange={setBudgetDay} />
          </Column>
        </Column>
      ) : (
        <Column gap={16}>
          <Skeleton height={72} />
          <Skeleton height={92} />
        </Column>
      )}
    </FormScreen>
  );
}
