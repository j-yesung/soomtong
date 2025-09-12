import { useEffect, useRef, useState } from "react";

export function useCellHeight(fallback: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [cellH, setCellH] = useState(Math.ceil(fallback));

  useEffect(() => {
    if (!ref.current) return;

    const probe = ref.current.querySelector<HTMLElement>("[data-cell='0']");
    if (!probe) return;

    const ro = new ResizeObserver(() => {
      const h = probe.getBoundingClientRect().height;
      if (h && Math.abs(h - cellH) >= 0.5) setCellH(Math.round(h));
    });
    ro.observe(probe);

    return () => ro.disconnect();
  }, [cellH]);

  return { ref, cellH, setCellH };
}
