import type { Transition } from "framer-motion";

export const DEFAULT_TAGS = ["교통비", "식비", "구독료"];

export const THRESHOLD = 270;

export const SPRING: Transition = { type: "spring", stiffness: 700, damping: 40 };
export const REMOVE_TWEEN: Transition = { type: "tween", duration: 0.12, ease: "easeIn" };

// 리스트 재정렬(위로 올라가는) 부드러움
export const LAYOUT_SPRING: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 28,
  mass: 0.9,
};

// 액션 아이콘 팝 효과 스프링
export const ACTION_SPRING = { stiffness: 700, damping: 28, mass: 0.25 };
