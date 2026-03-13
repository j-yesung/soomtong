/**
 * 숫자 문자열을 천단위 콤마로 포맷
 * @example "1000" -> "1,000"
 */
export function formatWithComma(value: string | number) {
  if (!value) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 콤마 제거 후 숫자로 변환
 */
export function parseNumericInput(raw: string) {
  const cleaned = raw.replace(/[^\d]/g, "");
  return Number(cleaned) || 0;
}
