import { css } from "styled-components";

export const responsiveFormHeights = css`
  min-height: 320px;
  max-height: 640px;

  @media (min-height: 667px) {
    height: calc(var(--vh, 1vh) * 66);
  }
  @media (min-height: 844px) {
    height: calc(var(--vh, 1vh) * 52);
  }
  @media (min-height: 896px) {
    height: calc(var(--vh, 1vh) * 49);
  }
  @media (min-height: 932px) {
    height: calc(var(--vh, 1vh) * 47.5);
  }
  @media (min-height: 1024px) {
    height: calc(var(--vh, 1vh) * 38);
  }
  @media (min-height: 1366px) {
    height: calc(var(--vh, 1vh) * 32.5);
  }

  padding-bottom: env(safe-area-inset-bottom, 0);
`;
