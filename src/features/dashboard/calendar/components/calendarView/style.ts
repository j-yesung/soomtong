import { Variants, motion } from "framer-motion";
import styled from "styled-components";

import { Button } from "@/shared/ui";

export const monthSlideVariants: Variants = {
  enter: (direction: 1 | -1) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
    pointerEvents: "none",
  }),
  center: {
    x: "0%",
    opacity: 1,
    pointerEvents: "auto",
  },
  exit: (direction: 1 | -1) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 1,
    pointerEvents: "none",
  }),
};

export const monthSlideReducedVariants: Variants = {
  enter: { x: 0, opacity: 1, pointerEvents: "none" },
  center: { x: 0, opacity: 1, pointerEvents: "auto" },
  exit: { x: 0, opacity: 1, pointerEvents: "none" },
};

export const CalendarWrapper = styled.div`
  position: relative;

  .rdp-months {
    display: block;
    overflow: hidden;
  }

  .rdp-month {
    width: 100%;
  }

  .rdp {
    --rdp-cell-size: 44px;
    --rdp-accent-color: #34c759;
    --rdp-accent-background-color: #34c759;
    margin: 0;
    font-family: inherit;
  }

  .rdp-root {
    width: 100%;
  }

  .rdp-months,
  .rdp-month,
  .rdp-month table,
  .rdp-month_grid,
  .rdp-weeks {
    touch-action: pan-y;
  }

  .rdp-month table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .rdp-month_grid {
    width: 100%;
  }

  .rdp-month_caption {
    display: flex;
    justify-content: center;
    padding: 16px 0;
    font-size: 18px;
    font-weight: 600;
  }

  .rdp-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 10px 0 4px;
  }

  .rdp-weekdays {
    display: table-row;
  }

  .rdp-weekday {
    display: table-cell;
    width: calc(100% / 7);
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    color: #8e8e93;
    padding: 8px 0;

    &:first-child {
      color: #ff3b30;
    }

    &:last-child {
      color: #007aff;
    }
  }

  .rdp-weeks {
    display: table-row-group;
  }

  .rdp-week {
    display: table-row;
  }

  .rdp-day {
    display: table-cell;
    width: calc(100% / 7);
    height: var(--rdp-cell-size);
    text-align: center;
    vertical-align: middle;
    padding: 4px 0;
  }

  .rdp-day_button {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 50%;
    font-size: 15px;
    font-weight: 400;
    color: #1a1a1a;
    transition: all 0.15s ease;

    &:focus,
    &:focus-visible {
      outline: none;
      box-shadow: none;
    }

    &:active {
      background: transparent;
    }
  }

  .rdp-day_sunday .rdp-day_button {
    color: #ff3b30;
  }

  .rdp-day_saturday .rdp-day_button {
    color: #007aff;
  }

  .rdp-outside .rdp-day_button {
    color: #c7c7cc;
  }

  .rdp-selected .rdp-day_button {
    font-weight: 500;
  }

  .rdp-today .rdp-day_button {
    font-weight: 700;
    color: #34c759;
  }

  .rdp-today.rdp-selected .rdp-day_button {
    color: #34c759;
  }

  @media (max-width: 390px), (max-height: 820px) {
    .rdp {
      --rdp-cell-size: 38px;
    }

    .rdp-month_caption {
      padding: 10px 0;
      font-size: 16px;
    }

    .rdp-nav {
      padding: 6px 0 2px;
    }

    .rdp-weekday {
      padding: 4px 0;
      font-size: 12px;
    }
  }

  @media (max-height: 680px) {
    .rdp {
      --rdp-cell-size: 34px;
    }

    .rdp-month_caption {
      padding: 8px 0;
      font-size: 16px;
    }
  }

  @media (max-width: 375px) and (max-height: 700px) {
    .rdp {
      --rdp-cell-size: 26px;
    }

    .rdp-day {
      padding: 0;
    }

    .rdp-day_button {
      font-size: 12px;
    }

    .rdp-month_caption {
      padding: 2px 0;
      font-size: 13px;
    }

    .rdp-nav {
      padding: 0;
      gap: 2px;
    }

    .rdp-weekday {
      padding: 0;
      font-size: 9px;
    }
  }
`;

export const MonthMotionViewport = styled.div`
  position: relative;
  display: block;
  align-items: start;
  overflow: hidden;
  min-height: 300px;
  isolation: isolate;

  @media (max-width: 390px), (max-height: 820px) {
    min-height: 300px;
  }

  @media (max-height: 680px) {
    min-height: 264px;
  }

  @media (max-height: 620px) {
    min-height: 240px;
  }

  @media (max-width: 375px) and (max-height: 700px) {
    min-height: 200px;
  }
`;

export const MotionMonth = styled(motion.div)`
  position: absolute;
  inset: 0;
  width: 100%;
  will-change: transform, opacity;
  backface-visibility: hidden;
  transform: translateZ(0);
`;

export const MonthNavButton = styled(Button)`
  width: auto !important;
  min-width: 74px;
  padding: 0 12px !important;
  touch-action: manipulation;
  background: ${({ theme }) => theme.colors.bg.inverseWhite} !important;
  color: ${({ theme }) => theme.colors.text.secondary} !important;
  border-color: ${({ theme }) => theme.colors.border.secondary} !important;
  font-size: 12px !important;
  font-weight: 700;
  letter-spacing: -0.1px;
  line-height: 1;

  &:disabled,
  &[aria-disabled="true"] {
    opacity: 0.4;
  }

  @media (max-width: 375px) and (max-height: 700px) {
    min-width: 50px;
    padding: 0 4px !important;
    font-size: 9px !important;
  }
`;

export const DayCell = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  font-size: 15px;
  font-weight: 400;
  color: inherit;
  transition: all 0.15s ease;
  padding: 0;
  -webkit-tap-highlight-color: transparent;

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: none;
  }

  &:active {
    background: transparent;
  }
`;

export const DayNumber = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  z-index: 1;

  .rdp-selected & {
    color: #fff;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: ${({ theme }) => theme.colors.text.primary};
      border-radius: 50%;
      z-index: -1;
    }
  }

  .rdp-selected.rdp-day_sunday & {
    &::before {
      background-color: #ff6b6b;
    }
  }

  .rdp-selected.rdp-day_saturday & {
    &::before {
      background-color: #4dabf7;
    }
  }

  .rdp-today.rdp-selected & {
    &::before {
      background-color: #34c759;
    }
  }
`;

export const DotContainer = styled.div`
  display: flex;
  gap: 2px;
  min-height: 6px;
  align-items: center;
`;

export const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #007aff;
`;

export const FixedDot = styled(Dot)`
  background-color: #007aff;
`;

export const VariableDot = styled(Dot)`
  background-color: #34c759;
`;
