import { useState } from "react";

import { Content, Key } from "./style";

type Props = {
  children: React.ReactNode;
  onPress: () => void;
  ariaLabel?: string;
};

export default function KeyButton({ children, onPress, ariaLabel }: Props) {
  const [pressed, setPressed] = useState(false);
  const [releasing, setReleasing] = useState(false);

  return (
    <Key
      type="button"
      aria-label={ariaLabel}
      data-pressed={pressed ? "true" : "false"}
      data-releasing={releasing ? "true" : "false"}
      onPointerDown={(e) => {
        e.preventDefault();
        setReleasing(false);
        setPressed(true);
      }}
      onPointerUp={(e) => {
        e.preventDefault();
        onPress();
        setPressed(false);
        setReleasing(true);
      }}
      onPointerLeave={() => {
        setPressed(false);
      }}
      onPointerCancel={() => {
        setPressed(false);
      }}
      onAnimationEnd={(e) => {
        if (e.animationName === "key-release-fade") {
          setReleasing(false);
        }
      }}
    >
      <Content>{children}</Content>
    </Key>
  );
}
