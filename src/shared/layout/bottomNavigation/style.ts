import { motion } from "framer-motion";
import styled from "styled-components";

export const NavContainer = styled.nav`
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  width: 190px;
  max-width: calc(100vw - 24px - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px));
  padding: 6px 0 max(8px, env(safe-area-inset-bottom, 0px));
  z-index: 100;
`;

export const NavInner = styled.div`
  position: relative;
  isolation: isolate;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  gap: 4px;
  padding: 4px;
  border: 1px solid light-dark(rgba(255, 255, 255, 0.58), rgba(255, 255, 255, 0.13));
  border-radius: 22px;
  background:
    radial-gradient(
      128% 150% at 8% -34%,
      light-dark(rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.16)) 0%,
      rgba(255, 255, 255, 0) 52%
    ),
    radial-gradient(
      88% 130% at 100% 120%,
      light-dark(rgba(180, 209, 255, 0.32), rgba(69, 112, 176, 0.2)) 0%,
      light-dark(rgba(180, 209, 255, 0), rgba(69, 112, 176, 0)) 68%
    ),
    linear-gradient(
      155deg,
      light-dark(rgba(255, 255, 255, 0.52), rgba(38, 43, 52, 0.9)) 0%,
      light-dark(rgba(232, 240, 255, 0.2), rgba(22, 26, 33, 0.82)) 50%,
      light-dark(rgba(255, 255, 255, 0.42), rgba(35, 40, 49, 0.88)) 100%
    );
  backdrop-filter: blur(24px) saturate(165%) brightness(1.06);
  -webkit-backdrop-filter: blur(24px) saturate(165%) brightness(1.06);
  box-shadow:
    0 12px 28px light-dark(rgba(21, 32, 55, 0.18), rgba(0, 0, 0, 0.4)),
    0 3px 8px light-dark(rgba(36, 52, 84, 0.08), rgba(0, 0, 0, 0.22)),
    0 1px 0 light-dark(rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.12)) inset,
    0 -1px 0 light-dark(rgba(101, 129, 177, 0.13), rgba(0, 0, 0, 0.34)) inset;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: 21px;
    background: linear-gradient(
      112deg,
      light-dark(rgba(255, 255, 255, 0.64), rgba(255, 255, 255, 0.12)) 0%,
      light-dark(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.04)) 20%,
      rgba(255, 255, 255, 0) 42%,
      light-dark(rgba(255, 255, 255, 0.1), rgba(120, 174, 255, 0.05)) 66%,
      light-dark(rgba(255, 255, 255, 0.48), rgba(255, 255, 255, 0.09)) 100%
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
    background: radial-gradient(
      ellipse,
      light-dark(rgba(255, 255, 255, 0.24), rgba(120, 174, 255, 0.1)) 0%,
      light-dark(rgba(255, 255, 255, 0), rgba(120, 174, 255, 0)) 68%
    );
    filter: blur(3px);
    pointer-events: none;
    z-index: 0;
  }
`;

export const NavItem = styled(motion.button)<{ $isActive: boolean }>`
  position: relative;
  flex: 0 0 88px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-height: 44px;
  padding: 4px 0;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 1;
  border-radius: 18px;
  transition:
    color 0.24s ease,
    transform 0.24s ease;

  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.text.primary : theme.colors.text.secondary)};

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
  gap: 2px;
  z-index: 1;
  pointer-events: none;
  text-shadow: 0 1px 0 light-dark(rgba(255, 255, 255, 0.34), rgba(0, 0, 0, 0.5));
`;

export const NavLabel = styled.span<{ $isActive?: boolean }>`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.text.primary : theme.colors.text.secondary)};
`;

export const ActivePill = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  border: 1px solid light-dark(rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.18));
  border-radius: 18px;
  background:
    radial-gradient(
      140% 138% at 0% -14%,
      light-dark(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.2)) 0%,
      rgba(255, 255, 255, 0) 53%
    ),
    radial-gradient(
      100% 110% at 110% 120%,
      light-dark(rgba(187, 214, 255, 0.42), rgba(96, 151, 232, 0.22)) 0%,
      light-dark(rgba(187, 214, 255, 0), rgba(96, 151, 232, 0)) 68%
    ),
    linear-gradient(
      160deg,
      light-dark(rgba(255, 255, 255, 0.74), rgba(62, 68, 80, 0.9)) 0%,
      light-dark(rgba(233, 242, 255, 0.4), rgba(40, 46, 56, 0.82)) 52%,
      light-dark(rgba(255, 255, 255, 0.62), rgba(53, 59, 70, 0.88)) 100%
    );
  backdrop-filter: blur(22px) saturate(175%) brightness(1.08);
  -webkit-backdrop-filter: blur(22px) saturate(175%) brightness(1.08);
  box-shadow:
    0 9px 20px light-dark(rgba(23, 40, 75, 0.17), rgba(0, 0, 0, 0.36)),
    0 2px 4px light-dark(rgba(33, 49, 81, 0.08), rgba(0, 0, 0, 0.22)),
    0 1px 0 light-dark(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.16)) inset,
    0 -1px 0 light-dark(rgba(90, 120, 175, 0.12), rgba(0, 0, 0, 0.28)) inset;

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
      light-dark(rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.18)),
      light-dark(rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03)) 72%,
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
    background: radial-gradient(
      circle,
      light-dark(rgba(255, 255, 255, 0.46), rgba(120, 174, 255, 0.18)) 0%,
      light-dark(rgba(255, 255, 255, 0), rgba(120, 174, 255, 0)) 68%
    );
    pointer-events: none;
  }
`;
