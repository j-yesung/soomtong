import { EmptyIcon } from "@/shared/assets/svg/interface";

import Text from "../text/style";
import * as S from "./style";

type Props = {
  description: string;
};

export default function Empty({ description }: Props) {
  return (
    <S.Wrapper>
      <S.IconBox>
        <EmptyIcon size={56} />
      </S.IconBox>
      <Text size={15} color="secondary" align="center">
        {description}
      </Text>
    </S.Wrapper>
  );
}
