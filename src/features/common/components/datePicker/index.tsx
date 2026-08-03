import * as S from "./style";

type Props = {
  days?: number[];
  selectedDay: number;
  onChange: (day: number) => void;
};

const DEFAULT_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function DatePicker({ days = DEFAULT_DAYS, selectedDay, onChange }: Props) {
  return (
    <S.NativeSelect value={selectedDay} onChange={(event) => onChange(Number(event.target.value))} aria-label="지급일">
      {days.map((day) => (
        <option key={day} value={day}>
          {day}일
        </option>
      ))}
    </S.NativeSelect>
  );
}
