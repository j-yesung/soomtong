import { PropsWithChildren } from "react";

import * as S from "./style";

type Props = {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
};

function Root({ children, direction, gap }: PropsWithChildren<Props>) {
  return (
    <S.CardRoot $direction={direction} $gap={gap}>
      {children}
    </S.CardRoot>
  );
}

function Footer({ children }: PropsWithChildren) {
  return <S.CardFooter>{children}</S.CardFooter>;
}

export const Card = Object.assign(Root, { Footer });
