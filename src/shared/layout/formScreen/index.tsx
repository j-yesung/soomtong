"use client";

import { FormEvent, ReactNode } from "react";

import { useReducedMotion } from "motion/react";

import { SingleArrowIcon } from "@/shared/assets/svg/interface";
import useFormLeaveGuard from "@/shared/model/useFormLeaveGuard";
import { Button, Text } from "@/shared/ui";

import * as S from "./style";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  secondaryAction?: ReactNode;
  isDirty: boolean;
  isSubmitDisabled: boolean;
  isSubmitting: boolean;
  submitLabel: string;
  onLeave: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function FormScreen({
  title,
  description,
  children,
  secondaryAction,
  isDirty,
  isSubmitDisabled,
  isSubmitting,
  submitLabel,
  onLeave,
  onSubmit,
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const { handleRequestLeave } = useFormLeaveGuard(isDirty, onLeave);

  return (
    <S.Screen
      initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
    >
      <S.Header>
        <S.BackButton type="button" onClick={handleRequestLeave} aria-label="뒤로가기">
          <SingleArrowIcon size={24} />
        </S.BackButton>
        <S.HeaderText>
          <Text as="h1" size={18} weight={700}>
            {title}
          </Text>
          {description && (
            <Text size={13} color="secondary">
              {description}
            </Text>
          )}
        </S.HeaderText>
        <S.HeaderAction />
      </S.Header>

      <S.Form onSubmit={onSubmit} noValidate>
        <S.Content>{children}</S.Content>
        <S.ActionBar>
          {secondaryAction}
          <Button
            type="submit"
            size="m"
            radius="md"
            fullWidth
            disabled={isSubmitDisabled || isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "저장 중..." : submitLabel}
          </Button>
        </S.ActionBar>
      </S.Form>
    </S.Screen>
  );
}
