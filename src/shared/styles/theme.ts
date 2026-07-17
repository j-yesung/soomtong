export const theme = {
  colors: {
    bg: {
      primary: "var(--color-brand)",
      secondary: "var(--color-secondary)",
      inverseWhite: "var(--color-inverseWhite)",
      danger: "var(--color-danger)",
      lightBlue: "var(--color-light-blue)",
      darkBlue: "#42A5F5",
    },
    text: {
      primary: "var(--color-brand)",
      secondary: "var(--color-text-secondary)",
      inverseWhite: "var(--color-inverseWhite)",
      blue: "var(--color-blue)",
      lightBlue: "#E3F2FD",
      darkBlue: "#42A5F5",
      gray: "#717171",
    },
    button: {
      primary: "var(--color-brand)",
      secondary: "var(--color-secondary)",
      danger: "var(--color-danger)",
      blue: "var(--color-blue)",
    },
    border: {
      primary: "var(--color-brand)",
      secondary: "var(--color-border)",
      light: "var(--color-border-light)",
      danger: "var(--color-danger)",
      blue: "var(--color-blue)",
      darkBlue: "#42A5F5",
    },
    badge: {
      neutral: { background: "#ECEFF3", text: "#56606F" },
      indigo: { background: "#EEF2FF", text: "#4338CA" },
      amber: { background: "#FEF3C7", text: "#92400E" },
      cyan: { background: "#CFFAFE", text: "#0E7490" },
      orange: { background: "#FFEDD5", text: "#C2410C" },
      sky: { background: "#E0F2FE", text: "#0369A1" },
      purple: { background: "#F3E8FF", text: "#7E22CE" },
      teal: { background: "#CCFBF1", text: "#0F766E" },
      rose: { background: "#FFE4E6", text: "#BE123C" },
      blue: { background: "#DBEAFE", text: "#1D4ED8" },
      slate: { background: "#E2E8F0", text: "#475569" },
      emerald: { background: "#D1FAE5", text: "#047857" },
    },
    disabled: "var(--color-disabled)",
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    pill: "9999px",
  },
  font: {
    sm: "12px",
    md: "16px",
    lg: "18px",
    xl: "22px",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    bold: "700",
  },
  shadows: {
    card: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    modal: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
    focusRing: "0 0 0 3px rgba(59, 130, 246, 0.45)",
  },
} as const;

export type AppTheme = typeof theme;
export type BadgeTone = keyof AppTheme["colors"]["badge"];
