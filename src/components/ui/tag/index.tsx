import { TAG_COLORS } from "@/constants";

import * as S from "./style";
import * as T from "./type";

export default function Tag({
  onClick,
  children,
  isSelected,
  fontSize,
  fontWeight,
  variant = "default",
  color,
}: T.TagProps) {
  const categoryColor = TAG_COLORS[children as string];

  return (
    <S.TagButton
      onClick={onClick}
      variant={variant}
      color={color ?? categoryColor}
      isSelected={isSelected}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children}
    </S.TagButton>
  );
}
