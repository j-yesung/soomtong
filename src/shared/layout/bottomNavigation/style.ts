import { motion } from "framer-motion";
import styled from "styled-components";

export const NavContainer = styled.nav`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  padding: 12px 18px calc(env(safe-area-inset-bottom, 0px) + 18px);
  z-index: 100;
`;

export const NavInner = styled.div`
  position: relative;
  isolation: isolate;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 6px;
  padding: 6px;
  border: 1px solid var(--nav-border);
  border-radius: 28px;
  background: var(--nav-background);
  backdrop-filter: blur(32px) saturate(165%) brightness(1.06);
  -webkit-backdrop-filter: blur(32px) saturate(165%) brightness(1.06);
  box-shadow: var(--nav-shadow);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: 27px;
    background: var(--nav-sheen);
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    right: -18%;
    bottom: -92%;
    width: 74%;
    height: 150%;
    background: var(--nav-glow);
    filter: blur(3px);
    pointer-events: none;
    z-index: 0;
  }
`;

export const NavItem = styled(motion.button)<{ $isActive: boolean }>`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 56px;
  padding: 9px 0;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 1;
  border-radius: 22px;
  transition:
    color 0.24s ease,
    transform 0.24s ease;

  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.text.primary : "var(--nav-label)")};

  @media (hover: hover) {
    &:hover {
      transform: translateY(-1px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.border.blue};
    outline-offset: 2px;
  }

  &:focus {
    outline: none;
  }
`;

export const NavContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  z-index: 1;
  pointer-events: none;
  text-shadow: var(--nav-text-shadow);
`;

export const NavLabel = styled.span<{ $isActive?: boolean }>`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.text.primary : "var(--nav-label)")};
`;

export const ActivePill = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  border: 1px solid var(--nav-pill-border);
  border-radius: 22px;
  background: var(--nav-pill-background);
  backdrop-filter: blur(22px) saturate(175%) brightness(1.08);
  -webkit-backdrop-filter: blur(22px) saturate(175%) brightness(1.08);
  box-shadow: var(--nav-pill-shadow);

  &::before {
    content: "";
    position: absolute;
    left: 10%;
    top: 1px;
    width: 80%;
    height: 44%;
    border-radius: 50%;
    background: var(--nav-pill-sheen);
    filter: blur(1px);
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    right: -20%;
    bottom: -72%;
    width: 76%;
    height: 120%;
    border-radius: 50%;
    background: var(--nav-pill-glow);
    pointer-events: none;
  }
`;
