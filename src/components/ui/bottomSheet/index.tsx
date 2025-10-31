import { ReactNode, useEffect, useState } from "react";

import Column from "../column";
import Heading from "../heading";
import Portal from "../portal";
import Row from "../row";
import * as S from "./style";

type Props = {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
};

export default function BottomSheet({ isOpen, title, children, onClose }: Props) {
  const [present, setPresent] = useState(isOpen);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (!present) setPresent(true);

      requestAnimationFrame(() => setExiting(false));

      document.body.classList.add("scroll-lock");
    } else if (present) {
      setExiting(true);
    }
  }, [isOpen, present]);

  const handleAnimationEnd = () => {
    if (exiting) {
      setPresent(false);
      setExiting(false);
      document.body.classList.remove("scroll-lock");
    }
  };

  if (!present) return null;

  return (
    <Portal>
      <S.Backdrop aria-hidden="true" role="presentation" onClick={onClose} />

      <S.Sheet role="dialog" aria-modal="true" $isOpen={isOpen} onAnimationEnd={handleAnimationEnd}>
        {title && (
          <Row as="header" pvh={[16, 16, 0]} gap={8} align="center">
            <Heading fontWeight="bold" level={4}>
              {title}
            </Heading>
            <S.CloseButton onClick={onClose} aria-label="Close">
              ✕
            </S.CloseButton>
          </Row>
        )}
        <Column overflow="auto" padding={16}>
          {children}
        </Column>
      </S.Sheet>
    </Portal>
  );
}
