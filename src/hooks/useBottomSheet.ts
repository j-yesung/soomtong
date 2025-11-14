import { useCallback, useRef, useState } from "react";
import type React from "react";

type UseBottomSheetDragOptions = {
  distanceThreshold?: number; // 얼마나 많이 내려야 그냥 닫히는지
  fastDistanceThreshold?: number; // 빠르게 튕겨내릴 때 최소 이동 거리
  velocityThreshold?: number; // 빠르게 튕겨내릴 때 속도 기준(px/ms)
};

export function useBottomSheet(onClose: () => void, options: UseBottomSheetDragOptions = {}) {
  const { distanceThreshold = 600, fastDistanceThreshold = 150, velocityThreshold = 0.6 } = options;

  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [snapBack, setSnapBack] = useState(false);

  const startYRef = useRef<number | null>(null);
  const lastYRef = useRef(0);
  const lastTRef = useRef(0);

  const reset = useCallback(() => {
    setIsDragging(false);
    setDragY(0);
    setSnapBack(false);
    startYRef.current = null;
    lastYRef.current = 0;
    lastTRef.current = 0;
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    setIsDragging(true);
    setSnapBack(false);
    startYRef.current = e.clientY;
    lastYRef.current = e.clientY;
    lastTRef.current = performance.now();

    try {
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    } catch {
      // noop
    }
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

    const isDistanceClose = totalDy > distanceThreshold;
    const isFastClose = totalDy > fastDistanceThreshold && vy > velocityThreshold;
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

  const onTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = () => {
    if (snapBack) {
      setSnapBack(false);
      setDragY(0);
    }
  };

  return {
    isDragging,
    dragY,
    snapBack,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onTransitionEnd,
    reset,
  };
}
