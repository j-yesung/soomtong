
import { PropsWithChildren } from "react";

import { AppTheme } from "@/shared/styles/theme";

import * as S from "./style";

type Props = {
  children: React.ReactNode;
  position?: React.CSSProperties["position"];
  direction?: "row" | "column";
  gap?: number;
  radius?: keyof AppTheme["radius"];
  as?: React.ElementType;
};

function Root({ children, direction, position, gap, radius = "sm", as }: PropsWithChildren<Props>) {
  return (
    <S.CardRoot $direction={direction} $gap={gap} $radius={radius} as={as} $position={position}>
      {children}
    </S.CardRoot>
  );
}

function Footer({ children }: PropsWithChildren) {
  return <S.CardFooter>{children}</S.CardFooter>;
}

const Card = Object.assign(Root, { Footer });

export default Card;
export { Footer as CardFooter, Root as CardRoot };
