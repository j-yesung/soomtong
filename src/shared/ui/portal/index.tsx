
import { PropsWithChildren, useEffect, useState } from "react";

import { createPortal } from "react-dom";

type Props = PropsWithChildren<{ container?: Element | null }>;

export default function Portal({ children, container }: Props) {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    setTarget(container ?? document.getElementById("portal"));
  }, [container]);

  if (!target) return null;

  return createPortal(children, target);
}
