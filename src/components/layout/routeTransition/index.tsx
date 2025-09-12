"use client";

import { ReactNode } from "react";

import { easeOut, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

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
        animate: { opacity: 1, transition: { duration: 0.25, ease: easeOut } },
      };

  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial="initial"
      animate="animate"
      className="min-h-dvh"
      style={{ width: "100%", willChange: "opacity" }}
    >
      {children}
    </motion.div>
  );
}
