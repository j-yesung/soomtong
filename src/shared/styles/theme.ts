export const theme = {
  colors: {
    bg: {
      primary: "var(--color-brand)",
      secondary: "var(--color-secondary)",
      inverseWhite: "var(--color-surface)",
      danger: "var(--color-danger)",
      lightBlue: "var(--color-light-blue)",
      darkBlue: "var(--color-dark-blue)",
      input: "var(--color-input)",
    },
    text: {
      primary: "var(--color-text)",
      secondary: "var(--color-text-secondary)",
      tertiary: "var(--color-text-tertiary)",
      inverseWhite: "var(--color-text-inverse)",
      blue: "var(--color-blue)",
      lightBlue: "var(--color-pale-blue)",
      darkBlue: "var(--color-dark-blue)",
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
      darkBlue: "var(--color-dark-blue)",
    },
    badge: {
      neutral: { background: "var(--color-badge-neutral-bg)", text: "var(--color-badge-neutral-text)" },
      indigo: { background: "var(--color-badge-indigo-bg)", text: "var(--color-badge-indigo-text)" },
      amber: { background: "var(--color-badge-amber-bg)", text: "var(--color-badge-amber-text)" },
      cyan: { background: "var(--color-badge-cyan-bg)", text: "var(--color-badge-cyan-text)" },
      orange: { background: "var(--color-badge-orange-bg)", text: "var(--color-badge-orange-text)" },
      sky: { background: "var(--color-badge-sky-bg)", text: "var(--color-badge-sky-text)" },
      purple: { background: "var(--color-badge-purple-bg)", text: "var(--color-badge-purple-text)" },
      teal: { background: "var(--color-badge-teal-bg)", text: "var(--color-badge-teal-text)" },
      rose: { background: "var(--color-badge-rose-bg)", text: "var(--color-badge-rose-text)" },
      blue: { background: "var(--color-badge-blue-bg)", text: "var(--color-badge-blue-text)" },
      slate: { background: "var(--color-badge-slate-bg)", text: "var(--color-badge-slate-text)" },
      emerald: { background: "var(--color-badge-emerald-bg)", text: "var(--color-badge-emerald-text)" },
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
    card: "var(--shadow-card)",
    modal: "var(--shadow-modal)",
    focusRing: "var(--focus-ring)",
  },
} as const;

export type AppTheme = typeof theme;
export type BadgeTone = keyof AppTheme["colors"]["badge"];
