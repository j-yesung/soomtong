import { css } from "styled-components";

export const responsiveFormHeights = css`
  min-height: 320px;
  max-height: 640px;

  /* 기본: JS로 계산된 --vh 사용 */
  height: calc(var(--vh, 1vh) * 60);

  @media (min-height: 700px) {
    height: calc(var(--vh, 1vh) * 52);
  }

  @media (min-height: 800px) {
    height: calc(var(--vh, 1vh) * 47);
  }

  @media (min-height: 1000px) {
    height: calc(var(--vh, 1vh) * 38);
  }

  @media (min-height: 1300px) {
    height: calc(var(--vh, 1vh) * 32.5);
  }

  /* 최신 브라우저에서는 dvh로 교체 */
  @supports (height: 100dvh) {
    height: 60dvh;

    @media (min-height: 700px) {
      height: 52dvh;
    }

    @media (min-height: 800px) {
      height: 47dvh;
    }

    @media (min-height: 1000px) {
      height: 38dvh;
    }

    @media (min-height: 1300px) {
      height: 32.5dvh;
    }
  }

  padding-bottom: env(safe-area-inset-bottom, 0);
`;
