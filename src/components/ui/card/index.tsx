import { PropsWithChildren } from "react";

import * as S from "./style";

type Props = {
  children: React.ReactNode;
  direction?: "row" | "column";
  gap?: number;
};

export default function Card({ children, direction, gap }: PropsWithChildren<Props>) {
  return (
    <S.CardRoot $direction={direction} $gap={gap}>
      {children}
    </S.CardRoot>
  );
}
