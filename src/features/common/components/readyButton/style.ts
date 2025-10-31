import { motion } from "framer-motion";
import styled, { css } from "styled-components";

const FIXED_STYLES = css`
  position: fixed;
  padding: 20px;
  transform: translateX(-50%) !important;
`;

const COMMON_STYLES = css`
  box-sizing: border-box;
  min-width: 320px;
  max-width: 500px;
  width: 100%;
  z-index: 10;
  left: 50%;
`;

export const Motion = styled(motion.div)<{ $offset: number; $position: "bottom" | "top" | "none" }>`
  ${({ $position, $offset }) =>
    $position === "bottom"
      ? css`
          ${COMMON_STYLES}
          ${FIXED_STYLES}
          bottom: calc(env(safe-area-inset-bottom, 0px) + ${$offset}px);
        `
      : $position === "top"
        ? css`
            ${COMMON_STYLES}
            ${FIXED_STYLES}
            top: calc(env(safe-area-inset-top, 0px));
          `
        : css`
            ${COMMON_STYLES}
          `}
`;
