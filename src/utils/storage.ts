export const safeLocalStorage = {
  getItem: (key: string) => {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      // Safari 시크릿 모드 등에서 접근 거부 시 null 반환
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      // 저장 실패 시 에러 무시 (사용자에게 치명적이지 않음)
      console.warn("Local storage is not available:", e);
    }
  },
};
