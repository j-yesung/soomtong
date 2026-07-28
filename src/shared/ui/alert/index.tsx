import { KeyboardEvent, useCallback, useEffect, useId, useRef } from "react";

import Button from "../button";
import Column from "../column";
import Portal from "../portal";
import Row from "../row";
import Text from "../text/style";
import * as S from "./style";

type AlertProps = {
  isOpen: boolean;
  title?: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isConfirmDisabled?: boolean;
  confirmColor?: "primary" | "danger";
};

export default function Alert({
  isOpen,
  title,
  description,
  confirmText = "확인",
  cancelText = "닫기",
  onConfirm,
  onCancel,
  isConfirmDisabled = false,
  confirmColor = "primary",
}: AlertProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    return () => previousFocusRef.current?.focus();
  }, [isOpen]);

  const handleConfirmButtonRef = useCallback(
    (element: HTMLButtonElement | null) => {
      confirmButtonRef.current = element;
      if (isOpen) element?.focus();
    },
    [isOpen],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && onCancel) {
      event.preventDefault();
      onCancel();
      return;
    }

    if (event.key !== "Tab") return;

    const focusableElements = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (!firstElement || !lastElement) return;

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <S.Backdrop onClick={onCancel}>
        <S.Dialog
          ref={dialogRef}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={descriptionId}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={handleKeyDown}
        >
          <Column gap={6}>
            {title && (
              <Text id={titleId} size={16} weight={700}>
                {title}
              </Text>
            )}
            <Text id={descriptionId} size={14} color="secondary">
              {description}
            </Text>
          </Column>
          <Row justify="flex-end" gap={8}>
            {onCancel && (
              <Button variant="outline" width={72} height={36} onClick={onCancel}>
                {cancelText}
              </Button>
            )}
            <Button
              ref={handleConfirmButtonRef}
              width={72}
              height={36}
              color={confirmColor}
              onClick={onConfirm}
              disabled={isConfirmDisabled}
            >
              {confirmText}
            </Button>
          </Row>
        </S.Dialog>
      </S.Backdrop>
    </Portal>
  );
}
