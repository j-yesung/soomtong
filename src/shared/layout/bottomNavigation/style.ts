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
  border: 1px solid rgba(255, 255, 255, 0.58);
  border-radius: 28px;
  background:
    radial-gradient(128% 150% at 8% -34%, rgba(255, 255, 255, 0.86) 0%, rgba(255, 255, 255, 0) 52%),
    radial-gradient(88% 130% at 100% 120%, rgba(180, 209, 255, 0.32) 0%, rgba(180, 209, 255, 0) 68%),
    linear-gradient(155deg, rgba(255, 255, 255, 0.52) 0%, rgba(232, 240, 255, 0.2) 48%, rgba(255, 255, 255, 0.42) 100%);
  backdrop-filter: blur(32px) saturate(165%) brightness(1.06);
  -webkit-backdrop-filter: blur(32px) saturate(165%) brightness(1.06);
  box-shadow:
    0 20px 42px rgba(21, 32, 55, 0.2),
    0 5px 12px rgba(36, 52, 84, 0.08),
    0 1px 0 rgba(255, 255, 255, 0.86) inset,
    0 -1px 0 rgba(101, 129, 177, 0.13) inset;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: 27px;
    background: linear-gradient(
      112deg,
      rgba(255, 255, 255, 0.64) 0%,
      rgba(255, 255, 255, 0.16) 20%,
      rgba(255, 255, 255, 0) 42%,
      rgba(255, 255, 255, 0.1) 66%,
      rgba(255, 255, 255, 0.48) 100%
    );
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
    background: radial-gradient(ellipse, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 68%);
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

  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.text.primary : "#7f8797")};

  @media (hover: hover) {
    &:hover {
      transform: translateY(-1px);
    }
  }

  &:focus-visible {
    outline: 2px solid rgba(106, 155, 255, 0.55);
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
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.34);
`;

export const NavLabel = styled.span<{ $isActive?: boolean }>`
  font-size: 11px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.text.primary : "#7f8797")};
`;

export const ActivePill = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 22px;
  background:
    radial-gradient(140% 138% at 0% -14%, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0) 53%),
    radial-gradient(100% 110% at 110% 120%, rgba(187, 214, 255, 0.42) 0%, rgba(187, 214, 255, 0) 68%),
    linear-gradient(160deg, rgba(255, 255, 255, 0.74) 0%, rgba(233, 242, 255, 0.4) 52%, rgba(255, 255, 255, 0.62) 100%);
  backdrop-filter: blur(22px) saturate(175%) brightness(1.08);
  -webkit-backdrop-filter: blur(22px) saturate(175%) brightness(1.08);
  box-shadow:
    0 9px 20px rgba(23, 40, 75, 0.17),
    0 2px 4px rgba(33, 49, 81, 0.08),
    0 1px 0 rgba(255, 255, 255, 0.88) inset,
    0 -1px 0 rgba(90, 120, 175, 0.12) inset;

  &::before {
    content: "";
    position: absolute;
    left: 10%;
    top: 1px;
    width: 80%;
    height: 44%;
    border-radius: 50%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.76),
      rgba(255, 255, 255, 0.08) 72%,
      rgba(255, 255, 255, 0)
    );
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
    background: radial-gradient(circle, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0) 68%);
    pointer-events: none;
  }
`;
