import type { Transition } from "framer-motion";

export const DEFAULT_TAGS = [
  "주거비",
  "공과금",
  "교통비",
  "식비",
  "통신비",
  "구독료",
  "보험료",
  "의료비",
  "교육비",
  "기타생활비",
  "저축/투자",
];

export const TAG_COLORS: Record<string, string> = {
  "저축/투자": "#3E8EDE",
};

export const THRESHOLD = 270;

export const SPRING: Transition = { type: "spring", stiffness: 700, damping: 40 };
export const REMOVE_TWEEN: Transition = { type: "tween", duration: 0.07, ease: "easeIn" };

// 리스트 재정렬(위로 올라가는) 부드러움
export const LAYOUT_SPRING: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 28,
  mass: 0.9,
};

// 액션 아이콘 팝 효과 스프링
export const ACTION_SPRING = { stiffness: 700, damping: 28, mass: 0.25 };
