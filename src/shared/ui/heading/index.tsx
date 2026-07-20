import { JSX } from "react";

import * as S from "./style";
import * as T from "./type";

export default function Heading({
  children,
  level,
  align = "left",
  color = "primary",
  fontWeight = "normal",
  as,
  htmlFor,
}: T.HeadingProps) {
  const tag = as ?? (`h${level}` as keyof JSX.IntrinsicElements);

  return (
    <S.HeadingText as={tag} htmlFor={htmlFor} $level={level} $align={align} $color={color} $fontWeight={fontWeight}>
      {children}
    </S.HeadingText>
  );
}
