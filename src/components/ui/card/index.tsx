import { PropsWithChildren } from "react";

import * as S from "./style";

type Props = {
  children: React.ReactNode;
  isDirection?: "row" | "column";
  gap?: number;
};

export default function Card({ children, isDirection, gap }: PropsWithChildren<Props>) {
  return (
    <S.CardRoot $isDirection={isDirection} $gap={gap}>
      {children}
    </S.CardRoot>
  );
}
