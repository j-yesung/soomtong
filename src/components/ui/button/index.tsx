"use client";

import * as S from "./style";
import * as T from "./type";

export default function Button({
  children,
  onClick,
  size = "m",
  color = "default",
  disabled = false,
  fullWidth = false,
  variant = "fill",
  height,
  width,
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
      $height={height}
      $width={width}
    >
      {children}
    </S.Button>
  );
}
