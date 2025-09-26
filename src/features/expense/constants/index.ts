import type { Transition } from "framer-motion";

export const DEFAULT_TAGS = [
  "주거비", // 월세/관리비
  "공과금", // 전기, 수도, 가스
  "교통비", // 대중교통, 주유
  "식비", // 외식, 장보기
  "통신비", // 휴대폰, 인터넷
  "구독료", // 넷플릭스, 유튜브, 음악 등
  "보험료", // 건강보험, 자동차 보험
  "의료비", // 병원, 약국
  "교육비", // 학원, 수업
  "기타생활비", // 잡비
  "저축/투자", // 금융 상품, 주식, 예금 등
];

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
