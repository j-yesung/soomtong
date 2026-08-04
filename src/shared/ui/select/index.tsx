import { SelectHTMLAttributes } from "react";

import { ChevronDown } from "lucide-react";

import * as S from "./style";

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select(props: Props) {
  return (
    <S.Control>
      <S.NativeSelect {...props} />
      <ChevronDown size={17} aria-hidden />
    </S.Control>
  );
}
