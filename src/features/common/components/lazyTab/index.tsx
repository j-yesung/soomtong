import { useEffect, useState } from "react";

import { Variants } from "framer-motion";

import { DashboardTab, useDashboardTabStore } from "@/features/dashboard/home/store";

import * as S from "./style";

interface Props {
  activeValue: DashboardTab;
  children: React.ReactNode;
}

const tabVariants: Variants = {
  visible: {
    opacity: 1,
    scale: 1,
    display: "block",
    transition: {
      type: "spring",
      stiffness: 450,
      damping: 35,
    },
  },
  hidden: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export default function LazyTab({ activeValue, children }: Props) {
  const activeTab = useDashboardTabStore((state) => state.activeTab);

  const isActive = activeTab === activeValue;

  const [hasVisited, setHasVisited] = useState(isActive);

  useEffect(() => {
    if (isActive && !hasVisited) {
      setHasVisited(true);
    }
  }, [isActive, hasVisited]);

  if (!hasVisited && !isActive) return null;

  return (
    <S.Container
      initial={false}
      animate={isActive ? "visible" : "hidden"}
      variants={tabVariants}
      style={{ display: isActive ? "block" : "none" }}
    >
      {children}
    </S.Container>
  );
}
