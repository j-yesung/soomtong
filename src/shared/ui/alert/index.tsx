import { MouseEvent, SyntheticEvent, useEffect, useId, useRef } from "react";

import Button from "../button";
import Column from "../column";
import Row from "../row";
import Text from "../text/style";
import * as S from "./style";

type Props = {
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
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onCancel?.();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect();
    const isBackdrop = event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom;
    if (isBackdrop) onCancel?.();
  };

  return (
    <S.Dialog
      ref={dialogRef}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={descriptionId}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
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
        <Button width={72} height={36} color={confirmColor} onClick={onConfirm} disabled={isConfirmDisabled}>
          {confirmText}
        </Button>
      </Row>
    </S.Dialog>
  );
}
