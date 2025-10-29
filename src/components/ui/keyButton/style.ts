import styled from "styled-components";

export const Content = styled.span`
  position: relative;
  z-index: 1;
`;

export const Key = styled.button`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  border-radius: 14px;
  font-size: 20px;
  background: ${({ theme }) => theme.colors.bg?.inverseWhite};
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
  transition: transform 120ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0;
    background: ${({ theme }) => theme.colors.bg.secondary};
    pointer-events: none;
  }

  &[data-pressed="true"] {
    transform: translateY(1px) scale(0.985);
  }
  &[data-pressed="true"]::after {
    opacity: 1;
  }

  &[data-releasing="true"]::after {
    animation: key-release-fade 620ms ease-out forwards;
  }

  @keyframes key-release-fade {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
