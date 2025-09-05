import * as S from "./style";
import * as T from "./type";

export default function Tag({ onClick, children, isSelected, variant = "default" }: T.TagProps) {
  return (
    <S.TagButton onClick={onClick} $variant={variant} $isSelected={isSelected}>
      {children}
    </S.TagButton>
  );
}
