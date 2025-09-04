"use client";

import * as S from "./style";
import * as T from "./type";

export default function Button({
  children,
  onClick,
  size = "m",
  color = "default",
  disabled = false,
  fullWidth,
  variant = "fill",
}: T.ButtonProps) {
  return (
    <S.Button
      type="button"
      onClick={onClick}
      $size={size}
      $color={color}
      $fullWidth={fullWidth}
      $disabled={disabled}
      $variant={variant}
    >
      {children}
    </S.Button>
  );
}
