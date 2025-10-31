import { css } from "styled-components";

export const hideScrollbarOnTouch = css`
  @media (hover: none) and (pointer: coarse) {
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;
