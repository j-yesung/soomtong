"use client";

import { FormEvent, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useUserStore } from "@/features/auth/store";
import { AmountInput } from "@/features/common/components";
import {
  useFixedExpenseAddMutation,
  useFixedExpenseRemoveMutation,
  useFixedExpenseTableQuery,
  useFixedExpenseUpdateMutation,
} from "@/features/common/queries";
import { FixedItem } from "@/features/common/types";
import { TrashIcon } from "@/shared/assets/svg/interface";
import { FIXED_EXPENSE_CATEGORY_LIST } from "@/shared/config";
import FormScreen from "@/shared/layout/formScreen";
import { Alert, Button, Column, Empty, Heading, Input, Skeleton } from "@/shared/ui";
import { formatWithComma, parseNumericInput } from "@/shared/utils/formatter";

import * as S from "./style";

type Props =
  | { mode: "add"; createdAt?: never }
  | {
      mode: "edit";
      createdAt: number;
    };

type FormValues = {
  tag: string;
  day: number;
  amount: string;
  memo: string;
};

const createEmptyValues = (): FormValues => ({
  tag: "",
  day: new Date().getDate(),
  amount: "",
  memo: "",
});

const getValuesFromItem = (item: FixedItem): FormValues => ({
  tag: item.tag,
  day: item.day,
  amount: formatWithComma(item.amount),
  memo: item.memo ?? "",
});

export default function FixedExpenseFormScreen({ mode, createdAt }: Props) {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const { data, isFetched } = useFixedExpenseTableQuery(userId);
  const addMutation = useFixedExpenseAddMutation();
  const updateMutation = useFixedExpenseUpdateMutation();
  const removeMutation = useFixedExpenseRemoveMutation();

  const [values, setValues] = useState<FormValues>(createEmptyValues);
  const [initialValues, setInitialValues] = useState<FormValues>(createEmptyValues);
  const [isInitialized, setIsInitialized] = useState(mode === "add");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const item = mode === "edit" ? data?.items?.find((candidate) => candidate.createdAt === createdAt) : undefined;
  const isMissing = mode === "edit" && isFetched && !removeMutation.isPending && !item;

  useEffect(() => {
    if (mode !== "edit" || !item || isInitialized) return;

    const nextValues = getValuesFromItem(item);
    setValues(nextValues);
    setInitialValues(nextValues);
    setIsInitialized(true);
  }, [isInitialized, item, mode]);

  const isDirty = isInitialized && JSON.stringify(values) !== JSON.stringify(initialValues);
  const isSubmitting = addMutation.isPending || updateMutation.isPending || removeMutation.isPending;
  const isSubmitDisabled = !userId || !isInitialized || !values.tag || parseNumericInput(values.amount) < 1;

  const handleLeave = () => {
    router.back();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitDisabled || isSubmitting) return;

    const nextItem = {
      tag: values.tag,
      amount: parseNumericInput(values.amount),
      day: values.day,
      memo: values.memo,
    };
    const options = { onSuccess: handleLeave };

    if (mode === "edit") {
      updateMutation.mutate({ userId, createdAt, item: { ...nextItem, createdAt } }, options);
      return;
    }

    addMutation.mutate({ userId, item: { ...nextItem, createdAt: Date.now() } }, options);
  };

  const handleDelete = () => {
    if (!item || removeMutation.isPending) return;
    removeMutation.mutate({ userId, tag: item.tag, createdAt: item.createdAt }, { onSuccess: handleLeave });
  };

  if (isMissing) {
    return (
      <Column centerScreen gap={20} pvh={[24]}>
        <Empty description="고정지출 항목을 찾을 수 없어요." />
        <Button width={160} onClick={handleLeave}>
          목록으로 돌아가기
        </Button>
      </Column>
    );
  }

  return (
    <>
      <FormScreen
        title={mode === "add" ? "고정지출 추가" : "고정지출 수정"}
        description="매달 반복되는 지출을 관리해요"
        secondaryAction={
          mode === "edit" ? (
            <Button
              type="button"
              width={96}
              height={52}
              size="m"
              radius="md"
              variant="outline"
              color="danger"
              disabled={isSubmitting}
              onClick={() => setIsDeleteConfirmOpen(true)}
            >
              <TrashIcon size={18} />
              삭제
            </Button>
          ) : undefined
        }
        isDirty={isDirty}
        isSubmitDisabled={isSubmitDisabled}
        isSubmitting={isSubmitting}
        submitLabel={mode === "add" ? "추가하기" : "수정하기"}
        onLeave={handleLeave}
        onSubmit={handleSubmit}
      >
        {isInitialized ? (
          <Column gap={24}>
            <Column gap={10}>
              <Heading level={4} fontWeight="bold">
                지출 정보
              </Heading>
              <S.SelectFields>
                <S.SelectField>
                  <S.FieldLabel>납부일</S.FieldLabel>
                  <S.SelectControl>
                    <S.NativeSelect
                      value={values.day}
                      onChange={(event) => setValues((current) => ({ ...current, day: Number(event.target.value) }))}
                      aria-label="납부일"
                    >
                      {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                        <option key={day} value={day}>
                          {day}일
                        </option>
                      ))}
                    </S.NativeSelect>
                    <S.SelectIcon size={17} aria-hidden />
                  </S.SelectControl>
                </S.SelectField>

                <S.SelectField>
                  <S.FieldLabel>카테고리</S.FieldLabel>
                  <S.SelectControl>
                    <S.NativeSelect
                      value={values.tag}
                      onChange={(event) => setValues((current) => ({ ...current, tag: event.target.value }))}
                      aria-label="카테고리"
                    >
                      <option value="" disabled>
                        선택
                      </option>
                      {FIXED_EXPENSE_CATEGORY_LIST.map(({ name }) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </S.NativeSelect>
                    <S.SelectIcon size={17} aria-hidden />
                  </S.SelectControl>
                </S.SelectField>
              </S.SelectFields>
            </Column>

            <Column gap={10}>
              <Heading as="label" htmlFor="fixed-expense-amount" level={4} fontWeight="bold">
                지출 금액
              </Heading>
              <AmountInput
                id="fixed-expense-amount"
                value={values.amount}
                onChange={(amount) => setValues((current) => ({ ...current, amount }))}
              />
            </Column>

            <Column gap={10}>
              <Heading as="label" htmlFor="fixed-expense-memo" level={4} fontWeight="bold">
                메모
              </Heading>
              <Input
                id="fixed-expense-memo"
                name="memo"
                value={values.memo}
                onChange={(event) => setValues((current) => ({ ...current, memo: event.target.value }))}
                placeholder="메모를 입력해 주세요. (선택)"
                variant="outline"
                maxLength={80}
                fullWidth
              />
            </Column>
          </Column>
        ) : (
          <Column gap={16}>
            <Skeleton height={100} />
            <Skeleton height={72} />
            <Skeleton height={52} />
          </Column>
        )}
      </FormScreen>

      <Alert
        isOpen={isDeleteConfirmOpen}
        title="고정지출을 삭제할까요?"
        description="삭제한 항목은 다시 복구할 수 없어요."
        confirmText="삭제"
        cancelText="취소"
        confirmColor="danger"
        isConfirmDisabled={removeMutation.isPending}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteConfirmOpen(false)}
      />
    </>
  );
}
