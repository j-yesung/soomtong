/**
 * 반응형 유틸리티 함수
 * clamp()를 사용해 뷰포트 기반 유동 사이즈 생성
 */

/**
 * 유동 폰트 사이즈 생성
 * @param min 최소 크기 (px)
 * @param max 최대 크기 (px)
 * @param baseWidth 기준 뷰포트 너비 (기본 375px - iPhone SE)
 * @returns CSS clamp() 문자열
 *
 * @example
 * fluidSize(18, 22) // "clamp(18px, 5.33vw, 22px)"
 */
export const fluidSize = (min: number, max: number, baseWidth = 375): string => {
  const preferredVw = ((min + max) / 2 / baseWidth) * 100;
  return `clamp(${min}px, ${preferredVw.toFixed(2)}vw, ${max}px)`;
};

/**
 * 반응형 간격 생성
 */
export const fluidSpacing = (min: number, max: number, baseWidth = 375): string => {
  const preferredVw = ((min + max) / 2 / baseWidth) * 100;
  return `clamp(${min}px, ${preferredVw.toFixed(2)}vw, ${max}px)`;
};
