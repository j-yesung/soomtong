import { useCallback, useRef, useState } from "react";

type UseBottomSheetDragOptions = {
  distanceThreshold?: number;
  fastDistanceThreshold?: number;
  velocityThreshold?: number;
  resistanceStart?: number;
  resistanceFactor?: number;
};

export function useBottomSheet(onClose: () => void, options: UseBottomSheetDragOptions = {}) {
  const {
    distanceThreshold = 600,
    fastDistanceThreshold = 150,
    velocityThreshold = 0.6,
    resistanceStart = 120,
    resistanceFactor = 0.35,
  } = options;

  const sheetRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [snapBack, setSnapBack] = useState(false);

  const startYRef = useRef<number | null>(null);
  const dragYRef = useRef(0);
  const prevMoveYRef = useRef(0);
  const prevMoveTRef = useRef(0);
  const velocityRef = useRef(0);

  const rafRef = useRef<number | null>(null);

  const applyDrag = useCallback(() => {
    rafRef.current = null;
    sheetRef.current?.style.setProperty("--sheet-drag", `${dragYRef.current}px`);
  }, []);

  const scheduleApply = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(applyDrag);
  }, [applyDrag]);

  const setDrag = useCallback(
    (y: number) => {
      dragYRef.current = y;
      scheduleApply();
    },
    [scheduleApply],
  );

  const reset = useCallback(() => {
    setIsDragging(false);
    setSnapBack(false);

    startYRef.current = null;
    dragYRef.current = 0;
    velocityRef.current = 0;

    prevMoveYRef.current = 0;
    prevMoveTRef.current = 0;

    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    sheetRef.current?.style.setProperty("--sheet-drag", `0px`);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    setIsDragging(true);
    setSnapBack(false);

    startYRef.current = e.clientY;

    prevMoveYRef.current = e.clientY;
    prevMoveTRef.current = performance.now();
    velocityRef.current = 0;

    try {
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    } catch {
      // do nothing
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || startYRef.current == null) return;

    const currentY = e.clientY;
    const rawDy = Math.max(0, currentY - startYRef.current);

    const dy = rawDy <= resistanceStart ? rawDy : resistanceStart + (rawDy - resistanceStart) * resistanceFactor;

    setDrag(dy);

    const now = performance.now();
    const dt = Math.max(1, now - prevMoveTRef.current);
    const dyStep = currentY - prevMoveYRef.current;

    velocityRef.current = Math.max(0, dyStep / dt);

    prevMoveYRef.current = currentY;
    prevMoveTRef.current = now;
  };

  const finishDrag = useCallback(() => {
    const totalDy = dragYRef.current;
    const vy = velocityRef.current;

    const isDistanceClose = totalDy > distanceThreshold;
    const isFastClose = totalDy > fastDistanceThreshold && vy > velocityThreshold;

    const shouldClose = isDistanceClose || isFastClose;

    setIsDragging(false);

    if (shouldClose) {
      onClose();
      setSnapBack(false);

      setDrag(0);
    } else {
      setSnapBack(true);
      setDrag(0);
    }

    startYRef.current = null;
  }, [distanceThreshold, fastDistanceThreshold, onClose, setDrag, velocityThreshold]);

  const onPointerUp = () => {
    if (!isDragging || startYRef.current == null) return;
    finishDrag();
  };

  const onPointerCancel = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setSnapBack(true);
    setDrag(0);
    startYRef.current = null;
  };

  const onTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = (e) => {
    if (e.propertyName === "transform" && snapBack) {
      setSnapBack(false);
      sheetRef.current?.style.setProperty("--sheet-drag", `0px`);
    }
  };

  return {
    sheetRef,
    isDragging,
    snapBack,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onTransitionEnd,
    reset,
  };
}
