import { useEffect, useState } from "react";

import * as S from "./style";

interface LazyTabProps {
  isVisible: boolean;
  children: React.ReactNode;
}

export default function LazyTab({ isVisible, children }: LazyTabProps) {
  const [hasVisited, setHasVisited] = useState(isVisible);

  useEffect(() => {
    if (isVisible && !hasVisited) {
      setHasVisited(true);
    }
  }, [isVisible, hasVisited]);

  if (!hasVisited && !isVisible) return null;

  return <S.Container $isVisible={isVisible}>{children}</S.Container>;
}
