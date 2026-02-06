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
};

export default function Alert({
  isOpen,
  title,
  description,
  confirmText = "확인",
  cancelText = "닫기",
  onConfirm,
  onCancel,
}: AlertProps) {
  if (!isOpen) return null;

  return (
    <Portal>
      <S.Backdrop onClick={onCancel}>
        <S.Dialog role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
          <Column gap={6}>
            {title && (
              <Text size={16} weight={700}>
                {title}
              </Text>
            )}
            <Text size={14} color="secondary">
              {description}
            </Text>
          </Column>
          <Row justify="flex-end" gap={8}>
            {onCancel && (
              <Button variant="outline" width={72} height={36} onClick={onCancel}>
                {cancelText}
              </Button>
            )}
            <Button width={72} height={36} onClick={onConfirm}>
              {confirmText}
            </Button>
          </Row>
        </S.Dialog>
      </S.Backdrop>
    </Portal>
  );
}
