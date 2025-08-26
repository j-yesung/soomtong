import { JSX } from "react";

import * as S from "./style";
import { HeadingProps } from "./type";

export default function Heading({
  children,
  level,
  align = "left",
  color = "base",
  fontWeight = "normal",
}: HeadingProps) {
  const tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <S.HeadingText as={tag} $level={level} $align={align} $color={color} $fontWeight={fontWeight}>
      {children}
    </S.HeadingText>
  );
}
