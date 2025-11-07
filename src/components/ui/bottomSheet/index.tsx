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
  const [hasOpened, setHasOpened] = useState(false);

  // 드래그 상태
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [snapBack, setSnapBack] = useState(false);

  const startYRef = useRef<number | null>(null);
  const lastYRef = useRef(0);
  const lastTRef = useRef(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (!present) {
        setPresent(true);
        setHasOpened(false);
      }

      requestAnimationFrame(() => setExiting(false));

      document.body.classList.add("scroll-lock");
      setIsDragging(false);
      setDragY(0);
      setSnapBack(false);
      startYRef.current = null;
      lastYRef.current = 0;
      lastTRef.current = 0;
    } else if (present) {
      setExiting(true);
    }
  }, [isOpen, present]);

  const handleAnimationEnd = () => {
    if (!exiting && isOpen) {
      setHasOpened(true);
    }

    if (exiting) {
      setPresent(false);
      setExiting(false);
      setIsDragging(false);
      setDragY(0);
      setSnapBack(false);
      document.body.classList.remove("scroll-lock");
      setHasOpened(false);
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    setIsDragging(true);
    setSnapBack(false);
    startYRef.current = e.clientY;
    lastYRef.current = e.clientY;
    lastTRef.current = performance.now();

    try {
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || startYRef.current == null) return;

    const currentY = e.clientY;
    const dy = Math.max(0, currentY - startYRef.current);
    setDragY(dy);

    const now = performance.now();
    lastYRef.current = currentY;
    lastTRef.current = now;
  };

  const onPointerUp = () => {
    if (!isDragging || startYRef.current == null) return;

    const now = performance.now();
    const totalDy = Math.max(0, lastYRef.current - (startYRef.current ?? lastYRef.current));

    const dt = Math.max(1, now - lastTRef.current);
    const vy = totalDy / dt;

    const isDistanceClose = totalDy > 600;
    const isFastClose = totalDy > 150 && vy > 0.6;
    const shouldClose = isDistanceClose || isFastClose;

    setIsDragging(false);

    if (shouldClose) {
      onClose();
      setSnapBack(false);
    } else {
      setSnapBack(true);
    }

    startYRef.current = null;
    lastYRef.current = 0;
    lastTRef.current = 0;
  };

  const onPointerCancel = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setSnapBack(true);
    startYRef.current = null;
  };

  const onTransitionEnd = () => {
    if (snapBack) {
      setSnapBack(false);
      setDragY(0);
    }
  };

  if (!present) return null;

  return (
    <Portal>
      <S.Backdrop aria-hidden="true" role="presentation" onClick={onClose} />

      <S.Sheet
        ref={sheetRef}
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
