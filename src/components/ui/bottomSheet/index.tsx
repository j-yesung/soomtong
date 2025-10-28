import { ReactNode } from "react";

import Column from "../column";
import Heading from "../heading";
import Portal from "../portal";
import * as S from "./style";

type Props = {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
};

export default function BottomSheet({ title, children, onClose }: Props) {
  return (
    <Portal>
      <S.Backdrop aria-hidden="true" role="presentation" onClick={onClose} />

      <S.Sheet role="dialog" aria-modal="true" aria-labelledby={title ? "bs-title" : undefined}>
        {title && (
          <S.Header>
            <Heading fontWeight="bold" level={4}>
              {title}
            </Heading>
            <S.CloseButton onClick={onClose}>✕</S.CloseButton>
          </S.Header>
        )}
        <Column overflow="auto" padding={16}>
          {children}
        </Column>
      </S.Sheet>
    </Portal>
  );
}
