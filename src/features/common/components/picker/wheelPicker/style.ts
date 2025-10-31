import styled from "styled-components";

type ItemHeight = {
  $itemHeight: number;
};

export const Viewport = styled.div<ItemHeight & { $visibleCount: number }>`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: ${({ $itemHeight, $visibleCount }) => $itemHeight * $visibleCount}px;

  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 28%, #000 72%, transparent);
  mask-image: linear-gradient(to bottom, transparent, #000 28%, #000 72%, transparent);

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    will-change: transform;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    cursor: grab;
  }

  ul:active {
    cursor: grabbing;
  }
`;

export const CenterHighlight = styled.div<ItemHeight>`
  position: absolute;
  left: 36%;
  top: 50%;
  width: 100px;
  height: ${({ $itemHeight }) => $itemHeight}px;
  transform: translateY(-50%);
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.bg.secondary};
  pointer-events: none;
`;

export const Item = styled.li<ItemHeight & { $active: boolean }>`
  height: ${({ $itemHeight }) => $itemHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  opacity: ${({ $active }) => ($active ? 1 : 0.45)};
  transform: ${({ $active }) => ($active ? "scale(1.06)" : "scale(1)")};
  font-weight: ${({ $active, theme }) => ($active ? theme.fontWeight.bold : theme.fontWeight.medium)};
  transition:
    opacity 0.15s ease,
    transform 0.15s ease,
    font-weight 0.15s ease;
`;
