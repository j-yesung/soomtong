import { ReactNode, useEffect, useState } from "react";

import { useBottomSheet } from "@/hooks/useBottomSheet";

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
  callback?: ReactNode;
};

export default function BottomSheet({ isOpen, title, children, onClose, callback }: Props) {
  const [present, setPresent] = useState(isOpen);
  const [exiting, setExiting] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const {
    isDragging,
    dragY,
    snapBack,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onTransitionEnd,
    reset,
  } = useBottomSheet(onClose, {
    distanceThreshold: 600,
    fastDistanceThreshold: 150,
    velocityThreshold: 0.6,
  });

  useEffect(() => {
    if (isOpen) {
      if (!present) {
        setPresent(true);
        setHasOpened(false);
      }

      requestAnimationFrame(() => setExiting(false));

      document.body.classList.add("scroll-lock");
      reset();
    } else if (present) {
      setExiting(true);
    }
  }, [isOpen, present, reset]);

  const handleAnimationEnd = () => {
    if (!exiting && isOpen) {
      setHasOpened(true);
    }

    if (exiting) {
      setPresent(false);
      setExiting(false);
      document.body.classList.remove("scroll-lock");
      setHasOpened(false);
      reset();
    }
  };

  if (!present) return null;

  return (
    <Portal>
      <S.Backdrop aria-hidden="true" role="presentation" onClick={onClose} />

      <S.Sheet
        role="dialog"
        aria-modal="true"
        $isOpen={isOpen}
        $hasOpened={hasOpened}
        $dragging={isDragging}
        $translateY={dragY}
        $snapBack={snapBack}
        onAnimationEnd={handleAnimationEnd}
        onTransitionEnd={onTransitionEnd}
      >
        <S.DragArea
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          <S.HandleBar />
          {title && (
            <Row as="header" pvh={[16, 16, 0]} gap={8} align="center" justify="space-between">
              <Heading fontWeight="bold" level={2}>
                {title}
              </Heading>
              {callback && callback}
            </Row>
          )}
        </S.DragArea>

        <Column overflow="auto" padding={16}>
          {children}
        </Column>
      </S.Sheet>
    </Portal>
  );
}
