import { ReactNode } from "react";

import { useOutsideClick } from "@/hooks/useOutsideClick";

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

export default function BottomSheet({ open, title, children, onClose }: Props) {
  const ref = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <>
      {open && (
        <Portal>
          <S.Backdrop aria-hidden="true" role="presentation" />

          <S.Sheet role="dialog" aria-modal="true" aria-labelledby={title ? "bs-title" : undefined} ref={ref}>
            {title && (
              <S.Header>
                <Heading id="bs-title" fontWeight="bold" level={4}>
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
      )}
    </>
  );
}
