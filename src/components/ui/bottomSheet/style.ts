"use client";

import styled from "styled-components";
import { Drawer } from "vaul";

import { hideScrollbarOnTouch } from "@/styles/scroll";

export const DrawerOverlay = styled(Drawer.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: transparent;

  &[data-state="open"] {
    animation: fadeIn 300ms ease-out;
  }

  &[data-state="closed"] {
    animation: fadeOut 200ms ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`;

export const DrawerContent = styled(Drawer.Content)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  z-index: 1110;

  width: 100%;
  max-width: 500px;
  min-width: 320px;

  background: ${({ theme }) => theme.colors.bg.inverseWhite};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.15);

  max-height: 85svh;
  display: flex;
  flex-direction: column;

  padding-bottom: env(safe-area-inset-bottom);
  overflow: hidden;

  outline: none;

  &[data-state="open"] {
    animation: slideUp 400ms cubic-bezier(0.32, 0.72, 0, 1);
  }

  &[data-state="closed"] {
    animation: slideDown 300ms cubic-bezier(0.32, 0.72, 0, 1);
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`;

export const SheetContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 24px;
  gap: 20px;

  ${hideScrollbarOnTouch}
  overscroll-behavior-y: none;
`;

export const DragArea = styled.div`
  padding: 16px 16px 0;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const HandleBar = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.16);
  margin: 0 auto 8px;
`;
