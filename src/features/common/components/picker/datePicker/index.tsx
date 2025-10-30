import { BottomSheet, Button } from "@/components/ui";

import WheelPicker from "../wheelPicker";

type Props = {
  day: number;
  isOpen: boolean;
  onClose: () => void;
  callback?: (day: number) => void;
  onDayChange?: (day: number) => void;
};

export default function DatePicker({ day, isOpen, onClose, callback, onDayChange }: Props) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="납입일 선택">
      <WheelPicker
        items={days}
        value={day}
        onChange={(d) => onDayChange?.(d)}
        onActiveChange={(d) => onDayChange?.(d)}
      />

      <Button
        onClick={() => {
          onClose();
          callback?.(day);
        }}
      >
        추가하기
      </Button>
    </BottomSheet>
  );
}
