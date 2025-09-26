import { useTheme } from "styled-components";

import { TAG_COLORS } from "@/features/expense/constants";

import * as S from "./style";
import * as T from "./type";

export default function Tag({ onClick, children, isSelected, variant = "default" }: T.TagProps) {
  const theme = useTheme();
  const color = TAG_COLORS[children as string] ?? theme.colors.text.secondary;

  return (
    <S.TagButton onClick={onClick} $variant={variant} $color={color} $isSelected={isSelected}>
      {children}
    </S.TagButton>
  );
}
