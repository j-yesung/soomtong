/**
 * 고정할 숫자 v를 min과 max 사이로 고정
 */
export function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

// 인덱스와 y 좌표 간 변환 함수
export function indexToY(index: number, itemHeight: number, visibleCount: number) {
  const offsetPx = ((visibleCount - 1) / 2) * itemHeight;
  return offsetPx - index * itemHeight;
}

// y 좌표를 인덱스로 변환하는 함수
export function yToIndex(y: number, itemHeight: number, visibleCount: number, maxIndex: number) {
  const offsetPx = ((visibleCount - 1) / 2) * itemHeight;
  const idx = Math.round((offsetPx - y) / itemHeight);
  return clamp(idx, 0, maxIndex);
}
