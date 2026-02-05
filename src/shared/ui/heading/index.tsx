"use client";

import { JSX } from "react";

import * as S from "./style";
import * as T from "./type";

export default function Heading({
  children,
  level,
  align = "left",
  color = "primary",
  fontWeight = "normal",
}: T.HeadingProps) {
  const tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <S.HeadingText as={tag} $level={level} $align={align} $color={color} $fontWeight={fontWeight}>
      {children}
    </S.HeadingText>
  );
}
