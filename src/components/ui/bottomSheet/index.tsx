import { ReactNode, useEffect, useRef, useState } from "react";

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

  const [dragY, setDragY] = useState(0);

  const dragYRef = useRef(0);
  const startYRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  const setDragYSafe = (value: number) => {
    dragYRef.current = value;
    setDragY(value);
  };

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
      setDragYSafe(0);
    }
  };

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    setDragYSafe(0);

    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!isDraggingRef.current || startYRef.current == null) return;

    const delta = e.clientY - startYRef.current;
    if (delta > 0) {
      setDragYSafe(delta);
    } else {
      setDragYSafe(0);
    }
  };

  const finishDrag = (pointerId: number, target: EventTarget & HTMLDivElement) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    startYRef.current = null;
    target.releasePointerCapture?.(pointerId);

    const threshold = 50;

    if (dragYRef.current > threshold) {
      setDragYSafe(0);
      onClose();
    } else {
      setDragYSafe(0);
    }
  };

  const handlePointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    finishDrag(e.pointerId, e.currentTarget);
  };

  const handlePointerCancel: React.PointerEventHandler<HTMLDivElement> = (e) => {
    finishDrag(e.pointerId, e.currentTarget);
  };

  if (!present) return null;

  return (
    <Portal>
      <S.Backdrop aria-hidden="true" role="presentation" onClick={onClose} />

      <S.Sheet
        role="dialog"
        aria-modal="true"
        $isOpen={isOpen}
        onAnimationEnd={handleAnimationEnd}
        style={dragY > 0 ? { transform: `translateY(${dragY}px)` } : undefined}
      >
        {/* 드래그 핸들 */}
        <S.DragHandleArea
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <S.DragHandleBar />
        </S.DragHandleArea>

        {title && (
          <Row as="header" pvh={[16, 16, 0]} gap={8} align="center">
            <Heading fontWeight="bold" level={3}>
              {title}
            </Heading>
            {callback && callback}
          </Row>
        )}
        <Column overflow="auto" padding={16}>
          {children}
        </Column>
      </S.Sheet>
    </Portal>
  );
}
