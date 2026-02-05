type NavigatorWithStandalone = Navigator & { standalone?: boolean };

export function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function isInStandaloneMode() {
  if (typeof window === "undefined") return false;

  const standalone = (window.navigator as NavigatorWithStandalone).standalone === true;
  const displayModeStandalone = window.matchMedia("(display-mode: standalone)").matches;

  return standalone || displayModeStandalone;
}
