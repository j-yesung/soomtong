"use client";

import { ReactNode } from "react";

import { easeOut, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const TransitionContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  will-change: opacity;
  flex: 1;
`;

/**
 * 모든 페이지를 마운트할 때 fade in만 적용하는 래퍼
 */
export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const variants = reduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1, transition: { duration: 0 } },
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.7, ease: easeOut } },
      };

  return (
    <TransitionContainer key={pathname} variants={variants} initial="initial" animate="animate">
      {children}
    </TransitionContainer>
  );
}
