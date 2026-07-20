import { useEffect, useRef } from "react";

import styled from "styled-components";

import { hideScrollbarOnTouch } from "@/shared/styles/scroll";
import { Button } from "@/shared/ui";

type Props = {
  days?: number[];
  selectedDay: number;
  onChange: (day: number) => void;
};

const DEFAULT_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export default function DatePicker({ days = DEFAULT_DAYS, selectedDay, onChange }: Props) {
  const activeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeButtonRef.current) return;

    activeButtonRef.current.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selectedDay]);

  return (
    <HorizontalScroll>
      {days.map((day) => (
        <Button
          ref={day === selectedDay ? activeButtonRef : undefined}
          key={day}
          isActive={day === selectedDay}
          onClick={() => onChange(day)}
          width={60}
          height={48}
          radius="md"
          variant="outline"
          color="secondary"
        >
          {day}일
        </Button>
      ))}
    </HorizontalScroll>
  );
}

const HorizontalScroll = styled.div`
  overflow-x: auto;
  display: flex;
  gap: 8px;
  ${hideScrollbarOnTouch}
`;
