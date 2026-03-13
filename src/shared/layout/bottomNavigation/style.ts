import { motion } from "framer-motion";
import styled from "styled-components";

export const NavContainer = styled.nav`
  position: fixed;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  padding: 12px 18px calc(env(safe-area-inset-bottom, 0px) + 18px);
  z-index: 100;
`;

export const NavInner = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 6px;
  padding: 6px;
  border-radius: 28px;
  background:
    radial-gradient(120% 120% at 18% -24%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 56%),
    linear-gradient(160deg, rgba(255, 255, 255, 0.56), rgba(236, 242, 255, 0.26) 48%, rgba(255, 255, 255, 0.44));
  backdrop-filter: blur(24px) saturate(130%);
  -webkit-backdrop-filter: blur(24px) saturate(130%);
  box-shadow:
    0 18px 35px rgba(16, 25, 46, 0.18),
    0 1px 0 rgba(255, 255, 255, 0.7) inset,
    0 0 0 1px rgba(255, 255, 255, 0.25) inset;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: 27px;
    background: linear-gradient(
      110deg,
      rgba(255, 255, 255, 0.46) 0%,
      rgba(255, 255, 255, 0.08) 22%,
      rgba(255, 255, 255, 0) 44%,
      rgba(255, 255, 255, 0.2) 68%,
      rgba(255, 255, 255, 0.5) 100%
    );
    pointer-events: none;
    opacity: 0.8;
  }

  &::after {
    content: "";
    position: absolute;
    left: -15%;
    top: -40%;
    width: 52%;
    height: 140%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0) 72%);
    transform: rotate(8deg);
    pointer-events: none;
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

  &:hover {
    transform: translateY(-1px);
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
  border-radius: 22px;
  background:
    radial-gradient(140% 130% at 0% 0%, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0) 55%),
    linear-gradient(160deg, rgba(255, 255, 255, 0.66) 0%, rgba(236, 243, 255, 0.34) 52%, rgba(255, 255, 255, 0.56));
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  box-shadow:
    0 10px 18px rgba(20, 34, 62, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.45) inset;

  &::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: 21px;
    background: linear-gradient(
      112deg,
      rgba(255, 255, 255, 0.62),
      rgba(255, 255, 255, 0.14) 36%,
      rgba(255, 255, 255, 0) 62%,
      rgba(255, 255, 255, 0.28)
    );
    pointer-events: none;
  }
`;
