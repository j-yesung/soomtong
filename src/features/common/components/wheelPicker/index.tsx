import Picker from "react-mobile-picker";

import * as S from "./style";

type Props = {
  items: number[];
  value: number;
  onChange: (v: number) => void;
  visibleCount?: number;
  itemHeight?: number;
};

export default function WheelPicker({ items, value, onChange, visibleCount = 8, itemHeight = 40 }: Props) {
  const pickerValue = { day: String(value) };

  return (
    <S.PickerWrapper>
      <S.StyledPicker
        value={pickerValue}
        onChange={(nextValue) => {
          onChange(Number(nextValue.day));
        }}
        height={visibleCount * itemHeight}
        itemHeight={itemHeight}
        wheelMode="normal"
      >
        <Picker.Column name="day">
          {items.map((d) => (
            <Picker.Item key={d} value={String(d)}>
              {d}일
            </Picker.Item>
          ))}
        </Picker.Column>
      </S.StyledPicker>

      <S.OverlayTop />
      <S.OverlayBottom />
      {/* <S.CenterHighlight /> */}
    </S.PickerWrapper>
  );
}
