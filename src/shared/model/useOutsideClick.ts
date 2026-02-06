"use client";

import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement>(onOutside: () => void) {
  const ref = useRef<T>(null);
  const latest = useRef(onOutside);

  useEffect(() => {
    latest.current = onOutside;
  }, [onOutside]);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;

      const path = e.composedPath?.();
      const target = e.target as Node;
      const inside = path ? path.includes(el) : target && el.contains(target);

      if (!inside) latest.current();
    };

    window.addEventListener("pointerdown", handler, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handler);
    };
  }, []);

  return ref;
}
