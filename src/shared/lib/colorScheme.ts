import { safeLocalStorage } from "@/shared/utils/storage";

export const COLOR_SCHEME_STORAGE_KEY = "soomtong-color-scheme";
export const COLOR_SCHEMES = ["light", "dark", "system"] as const;

export type ColorScheme = (typeof COLOR_SCHEMES)[number];

export function isColorScheme(value: string | null): value is ColorScheme {
  return COLOR_SCHEMES.some((colorScheme) => colorScheme === value);
}

export function getStoredColorScheme(): ColorScheme {
  const storedColorScheme = safeLocalStorage.getItem(COLOR_SCHEME_STORAGE_KEY);
  return isColorScheme(storedColorScheme) ? storedColorScheme : "system";
}

export function applyColorScheme(colorScheme: ColorScheme) {
  document.documentElement.style.colorScheme = colorScheme === "system" ? "light dark" : colorScheme;
}

export function saveColorScheme(colorScheme: ColorScheme) {
  safeLocalStorage.setItem(COLOR_SCHEME_STORAGE_KEY, colorScheme);
  applyColorScheme(colorScheme);
}

export const COLOR_SCHEME_INIT_SCRIPT = `try{const value=localStorage.getItem("${COLOR_SCHEME_STORAGE_KEY}");document.documentElement.style.colorScheme=value==="light"||value==="dark"?value:"light dark"}catch{}`;
