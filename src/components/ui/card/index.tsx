import { PropsWithChildren } from "react";

import * as S from "./style";

type Props = {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
  as?: React.ElementType;
};

function Root({ children, direction, gap, as }: PropsWithChildren<Props>) {
  return (
    <S.CardRoot $direction={direction} $gap={gap} as={as}>
      {children}
    </S.CardRoot>
  );
}

function Footer({ children, onClick }: PropsWithChildren<{ onClick?: () => void }>) {
  return <S.CardFooter onClick={onClick}>{children}</S.CardFooter>;
}

export const Card = Object.assign(Root, { Footer });
