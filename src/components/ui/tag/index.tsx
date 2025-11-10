import { TAG_COLORS } from "@/constants";

import * as S from "./style";
import * as T from "./type";

export default function Tag({ onClick, children, isSelected, fontSize, fontWeight, variant = "default" }: T.TagProps) {
  const color = TAG_COLORS[children as string];

  return (
    <S.TagButton
      onClick={onClick}
      variant={variant}
      color={color}
      isSelected={isSelected}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children}
    </S.TagButton>
  );
}
