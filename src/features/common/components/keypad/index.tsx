"use client";

import { useMemo } from "react";

import { ArrowIcon } from "@/assets/svg/interface";
import { Grid, KeyButton } from "@/components/ui";

type KeypadLayoutKey = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "back" | "reset";

type MoneyPadSectionProps = {
  onChange: (next: string) => void;
  value: string;
  layout?: KeypadLayoutKey[];
};

export default function Keypad({
  value,
  onChange,
  layout = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "reset", "0", "back"],
}: MoneyPadSectionProps) {
  const digits = useMemo(() => value.replace(/\D/g, ""), [value]);

  const format = (d: string) => {
    if (!d) return "";
    const n = Number(d);
    if (!Number.isFinite(n)) return "";
    return new Intl.NumberFormat("ko-KR").format(n);
  };

  const apply = (nextDigits: string) => {
    const normalized = nextDigits.replace(/^0+(?=\d)/, "");
    onChange(normalized ? format(normalized) : "");
    if (navigator.vibrate) navigator.vibrate(600);
  };

  const push = (d: string) => {
    const nextDigits = (digits || "") + d;
    apply(nextDigits);
  };

  const backspace = () => {
    if (!digits) return;
    const next = digits.slice(0, -1);
    apply(next);
  };

  const clearAll = () => {
    onChange("");
    if (navigator.vibrate) navigator.vibrate(600);
  };

  return (
    <Grid cols={3} gap={8} aria-label="number-keypad" fullWidth>
      {layout.map((k) => {
        if (k === "back") {
          return (
            <KeyButton key={k} ariaLabel="지우기" onPress={backspace}>
              <ArrowIcon rotate={270} />
            </KeyButton>
          );
        }
        if (k === "reset") {
          return (
            <KeyButton key={k} ariaLabel="초기화" onPress={clearAll}>
              초기화
            </KeyButton>
          );
        }
        return (
          <KeyButton key={k} ariaLabel={`${k} 입력`} onPress={() => push(k)}>
            {k}
          </KeyButton>
        );
      })}
    </Grid>
  );
}
