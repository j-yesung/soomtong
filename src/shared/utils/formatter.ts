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

/**
 * 원화 입력값을 안전한 양의 정수 범위에서 천 단위 콤마 문자열로 정규화
 */
export function formatAmountInput(raw: string) {
  const digits = raw.replace(/[^\d]/g, "").replace(/^0+(?=\d)/, "");
  if (!digits) return "";

  const safeInteger = BigInt(Number.MAX_SAFE_INTEGER);
  const value = BigInt(digits);

  return formatWithComma(value > safeInteger ? safeInteger.toString() : digits);
}
