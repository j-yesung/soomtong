import { ReactNode, useEffect, useState } from "react";

import { useBottomSheet } from "@/hooks/useBottomSheet";

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

type Base = "0%" | "110%";

export default function BottomSheet({ isOpen, title, children, onClose, callback }: Props) {
  const [present, setPresent] = useState(isOpen);
  const [base, setBase] = useState<Base>(isOpen ? "0%" : "110%");
  const [exiting, setExiting] = useState(false);

  const {
    sheetRef,
    isDragging,
    snapBack,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onTransitionEnd: onSheetTransitionEnd,
    reset,
  } = useBottomSheet(onClose, {
    distanceThreshold: 180,
    fastDistanceThreshold: 60,
    velocityThreshold: 0.35,
    resistanceStart: 40,
    resistanceFactor: 0.75,
  });

  useEffect(() => {
    if (isOpen) {
      if (!present) setPresent(true);

      setExiting(false);
      setBase("110%");
      requestAnimationFrame(() => setBase("0%"));

      document.body.classList.add("scroll-lock");
      reset();
      return;
    }

    if (present) {
      setExiting(true);

      setBase("110%");
    }
  }, [isOpen, present, reset]);

  const handleTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = (e) => {
    onSheetTransitionEnd(e);

    if (e.propertyName === "transform" && exiting) {
      setPresent(false);
      setExiting(false);
      document.body.classList.remove("scroll-lock");
      reset();
    }
  };

  if (!present) return null;

  return (
    <Portal>
      <S.Backdrop aria-hidden="true" role="presentation" $isOpen={isOpen} onClick={onClose} />

      <S.Sheet
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        $dragging={isDragging}
        $snapBack={snapBack}
        style={
          {
            ["--sheet-base"]: base,
          } as React.CSSProperties
        }
        onTransitionEnd={handleTransitionEnd}
      >
        <S.DragArea
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          <S.HandleBar />
          <Row as="header" pvh={[16, 16]} gap={8} align="center" justify="space-between">
            <Heading fontWeight="bold" level={2}>
              {title}
            </Heading>
            {callback && callback}
          </Row>
        </S.DragArea>

        <S.SheetContent>{children}</S.SheetContent>
      </S.Sheet>
    </Portal>
  );
}
