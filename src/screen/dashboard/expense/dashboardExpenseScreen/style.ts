import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.3;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const LoadingDots = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  line-height: 0;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    animation: ${bounce} 1s ease-in-out infinite;
  }

  span:nth-child(2) {
    animation-delay: 0.15s;
  }

  span:nth-child(3) {
    animation-delay: 0.3s;
  }
`;
