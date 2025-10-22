import styled from "styled-components";

export const Donut = styled.div<{ $size: number }>`
  display: inline-flex;
  position: relative;
  color: ${({ theme }) => theme.colors.bg.primary};
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
`;

export const Percent = styled.span<{ $size: number }>`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  line-height: 1;
  pointer-events: none;
  font-weight: 700;
  font-size: ${({ $size }) => Math.max(12, Math.round($size * 0.22))}px;
`;
