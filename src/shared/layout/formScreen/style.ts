import { motion } from "framer-motion";
import styled from "styled-components";

export const Screen = styled(motion.section)`
  width: 100%;
  height: 100svh;
  overflow: hidden;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  min-height: calc(68px + env(safe-area-inset-top, 0px));
  padding: calc(8px + env(safe-area-inset-top, 0px)) 16px 8px;
  display: grid;
  grid-template-columns: minmax(44px, 1fr) minmax(0, 3fr) minmax(44px, 1fr);
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.secondary};
  background: light-dark(rgba(255, 255, 255, 0.92), rgba(15, 17, 21, 0.92));
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
`;

export const BackButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radius.pill};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.primary};

  &:active {
    background: ${({ theme }) => theme.colors.bg.secondary};
  }
`;

export const HeaderText = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  text-align: center;
`;

export const HeaderAction = styled.div`
  min-width: 44px;
  display: flex;
  justify-content: flex-end;
`;

export const Form = styled.form`
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px 0;
  overscroll-behavior-y: contain;
`;

export const ActionBar = styled.footer`
  position: relative;
  z-index: 30;
  flex-shrink: 0;
  width: 100%;
  padding: 20px 20px max(20px, env(safe-area-inset-bottom, 0px));
  display: flex;
  gap: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.secondary};
  background: light-dark(rgba(255, 255, 255, 0.94), rgba(15, 17, 21, 0.94));
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  > .c__button {
    min-height: 52px;
    gap: 8px;
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    letter-spacing: -0.01em;
  }

  > .c__button:last-child {
    width: auto;
    flex: 1;
  }
`;
