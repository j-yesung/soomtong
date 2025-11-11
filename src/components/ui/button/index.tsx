"use client";

import * as S from "./style";
import * as T from "./type";

export default function Button({
  ref,
  children,
  onClick,
  size = "m",
  color = "primary",
  disabled = false,
  fullWidth = false,
  variant = "fill",
  height,
  width,
  radius = "sm",
  type = "button",
  isActive,
  ...rest
}: T.ButtonProps) {
  return (
    <S.Button
      ref={ref}
      type={type}
      onClick={onClick}
      $size={size}
      $color={color}
      $fullWidth={fullWidth}
      $disabled={disabled}
      $variant={variant}
      $height={height}
      $width={width}
      $radius={radius}
      $isActive={isActive}
      {...rest}
    >
      {children}
    </S.Button>
  );
}
