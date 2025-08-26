"use client";

import * as S from "./style";
import { ButtonProps } from "./type";

export default function Button({ children, onClick, size = "m", color = "default", fullWidth }: ButtonProps) {
  return (
    <S.Button type="button" onClick={onClick} $size={size} $color={color} $fullWidth={fullWidth}>
      {children}
    </S.Button>
  );
}
