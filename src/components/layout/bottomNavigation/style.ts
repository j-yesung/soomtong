import styled from "styled-components";

export const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 500px;
  padding: 12px 20px calc(env(safe-area-inset-bottom, 0px) + 25px);
  z-index: 100;
`;

export const NavInner = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 4px;
  padding: 6px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow:
    0 4px 30px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.3) inset;
`;

export const NavItem = styled.button<{ $isActive: boolean }>`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 0;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 1;
  border-radius: 18px;
  transition: color 0.2s ease;

  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.text.primary : "#8e8e93")};

  &:focus {
    outline: none;
  }
`;

export const NavContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const NavLabel = styled.span<{ $isActive?: boolean }>`
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.text.primary : "#8e8e93")};
`;

export const ActiveBackground = styled.div`
  position: absolute;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;
