import { useEffect, useState } from "react";

export function useKeyboardInset() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR 환경에서는 아무 작업도 하지 않음

    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => {
      const innerH = window.innerHeight;
      const vvH = vv.height ?? innerH;
      const top = vv.offsetTop ?? 0;
      const inset = Math.max(0, innerH - vvH - top);
      setOffset(inset);
    };

    update();
    vv.addEventListener("resize", update, { passive: true });
    vv.addEventListener("scroll", update, { passive: true });

    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  return offset;
}
