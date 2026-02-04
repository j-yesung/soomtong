import { useEffect, useState } from "react";

import { DashboardTab, useDashboardTabStore } from "@/features/dashboard/home/store";

import * as S from "./style";

interface LazyTabProps {
  activeValue: DashboardTab;
  children: React.ReactNode;
}

export default function LazyTab({ activeValue, children }: LazyTabProps) {
  const activeTab = useDashboardTabStore((state) => state.activeTab);

  const isActive = activeTab === activeValue;

  const [hasVisited, setHasVisited] = useState(isActive);

  useEffect(() => {
    if (isActive && !hasVisited) {
      setHasVisited(true);
    }
  }, [isActive, hasVisited]);

  if (!hasVisited && !isActive) return null;

  return <S.Container $isVisible={isActive}>{children}</S.Container>;
}
