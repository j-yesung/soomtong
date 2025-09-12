/**
 * 숫자 문자열을 천단위 콤마로 포맷
 * @example "1000" -> "1,000"
 */
export function formatWithComma(value: string | number) {
  if (!value) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 숫자만 허용하고, 선행 0 제거 후
 */
export function formatNumericInput(raw: string) {
  const digitsOnly = raw.replace(/[^\d]/g, ""); // 숫자만
  const trimmed = digitsOnly.replace(/^0+(?=\d)/, ""); // 선행 0 제거
  return formatWithComma(trimmed);
}

/**
 * 콤마 제거 후 숫자로 변환
 */
export function parseNumericInput(raw: string) {
  const cleaned = raw.replace(/[^\d]/g, "");
  return Number(cleaned) || 0;
}
