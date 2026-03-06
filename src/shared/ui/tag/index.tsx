
import * as S from "./style";
import * as T from "./type";

export default function Tag({
  onClick,
  children,
  selected,
  size = "sm",
  variant = "badge",
}: T.TagProps) {
  return (
    <S.TagButton
      onClick={onClick}
      variant={variant}
      selected={selected}
      size={size}
      clickable={Boolean(onClick)}
      aria-pressed={onClick ? selected : undefined}
    >
      {children}
    </S.TagButton>
  );
}
