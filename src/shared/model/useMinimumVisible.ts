import { useEffect, useRef, useState } from "react";

export default function useMinimumVisible(visible: boolean, minVisibleMs = 1200) {
  const [minimumVisible, setMinimumVisible] = useState(visible);
  const visibleStartedAtRef = useRef<number | null>(visible ? Date.now() : null);

  useEffect(() => {
    if (visible) {
      visibleStartedAtRef.current ??= Date.now();
      setMinimumVisible(true);
      return;
    }

    if (visibleStartedAtRef.current === null) {
      setMinimumVisible(false);
      return;
    }

    const elapsed = Date.now() - visibleStartedAtRef.current;
    const remaining = minVisibleMs - elapsed;

    if (remaining <= 0) {
      visibleStartedAtRef.current = null;
      setMinimumVisible(false);
      return;
    }

    const timer = window.setTimeout(() => {
      visibleStartedAtRef.current = null;
      setMinimumVisible(false);
    }, remaining);

    return () => {
      window.clearTimeout(timer);
    };
  }, [minVisibleMs, visible]);

  return minimumVisible;
}
