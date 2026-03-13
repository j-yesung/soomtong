import { NextMonthButtonProps, PreviousMonthButtonProps } from "react-day-picker";

import * as S from "../style";

export function PreviousMonthTextButton(props: PreviousMonthButtonProps) {
  const isDisabled = Boolean(props.disabled || props["aria-disabled"] === true);

  return (
    <S.MonthNavButton
      {...props}
      disabled={isDisabled}
      size="s"
      variant="outline"
      color="default"
      radius="pill"
      width={84}
      height={34}
    >
      이전달
    </S.MonthNavButton>
  );
}

export function NextMonthTextButton(props: NextMonthButtonProps) {
  const isDisabled = Boolean(props.disabled || props["aria-disabled"] === true);

  return (
    <S.MonthNavButton
      {...props}
      disabled={isDisabled}
      size="s"
      variant="outline"
      color="default"
      radius="pill"
      width={84}
      height={34}
    >
      다음달
    </S.MonthNavButton>
  );
}
