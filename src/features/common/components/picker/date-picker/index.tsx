'use client";';

import { useState } from "react";

import { BottomSheet, Button } from "@/components/ui";

import WheelPicker from "../wheel-picker";

type Props = {
  open: boolean;
  onClose: () => void;
  callback?: (day: number) => void;
};

export default function DatePicker({ open, onClose, callback }: Props) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const [day, setDay] = useState(1);

  return (
    <BottomSheet open={open} onClose={onClose} title="납입일 선택">
      <WheelPicker items={days} value={day} onChange={(d) => setDay(d)} onActiveChange={(d) => setDay(d)} />

      <Button
        onClick={() => {
          onClose();
          callback?.(day);
        }}
      >
        확인
      </Button>
    </BottomSheet>
  );
}
