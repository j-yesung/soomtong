"use client";

import { createGlobalStyle } from "styled-components";

/**
 * - 가벼운 Reset
 * - CSS 변수 기반 라이트/다크 테마 (prefers-color-scheme)
 * - 타이포/링크/버튼/스크롤바/포커스
 * - 시스템 폰트 스택 + 한글 가독성 개선
 */
export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light;

    --color-bg: #ffffff;
    --color-surface: #ffffff;
    --color-brand: #2d2d2d;
    --color-secondary: #f5f6f8;
    --color-input: #f0f1f3;
    --color-danger: #d7194b;
    --color-success: #3f7d43;
    --color-warning: #8a6100;
    --color-text: #25272b;
    --color-text-secondary: #626a76;
    --color-text-tertiary: #717987;
    --color-muted: var(--color-text-secondary);
    --color-text-inverse: #ffffff;
    --color-border: #dfe3e8;
    --color-border-light: #8a929f;
    --color-disabled: #8a929f;
    --color-light-blue: #eef5ff;
    --color-pale-blue: #e3f2fd;
    --color-blue: #2563eb;
    --color-dark-blue: #1976d2;

    --color-badge-neutral-bg: #eceff3;
    --color-badge-neutral-text: #56606f;
    --color-badge-indigo-bg: #eef2ff;
    --color-badge-indigo-text: #4338ca;
    --color-badge-amber-bg: #fef3c7;
    --color-badge-amber-text: #92400e;
    --color-badge-cyan-bg: #cffafe;
    --color-badge-cyan-text: #0e7490;
    --color-badge-orange-bg: #ffedd5;
    --color-badge-orange-text: #c2410c;
    --color-badge-sky-bg: #e0f2fe;
    --color-badge-sky-text: #0369a1;
    --color-badge-purple-bg: #f3e8ff;
    --color-badge-purple-text: #7e22ce;
    --color-badge-teal-bg: #ccfbf1;
    --color-badge-teal-text: #0f766e;
    --color-badge-rose-bg: #ffe4e6;
    --color-badge-rose-text: #be123c;
    --color-badge-blue-bg: #dbeafe;
    --color-badge-blue-text: #1d4ed8;
    --color-badge-slate-bg: #e2e8f0;
    --color-badge-slate-text: #475569;
    --color-badge-emerald-bg: #d1fae5;
    --color-badge-emerald-text: #047857;

    --color-skeleton-base: #e5e7eb;
    --color-skeleton-highlight: #f3f4f6;
    --color-picker-fade: rgba(255, 255, 255, 0.95);
    --color-picker-transparent: rgba(255, 255, 255, 0);
    --color-handle: rgba(37, 39, 43, 0.2);
    --color-pressed-overlay: rgba(255, 255, 255, 0.18);
    --color-card-pressed-overlay: rgba(255, 255, 255, 0.12);

    --shadow-card: 0 2px 16px rgba(15, 23, 42, 0.06);
    --shadow-modal: 0 10px 24px rgba(15, 23, 42, 0.14);
    --shadow-sheet: 0 -8px 24px rgba(15, 23, 42, 0.15);
    --focus-ring: 0 0 0 3px rgba(37, 99, 235, 0.34);

    --nav-label: #626a76;
    --nav-border: rgba(255, 255, 255, 0.58);
    --nav-background:
      radial-gradient(128% 150% at 8% -34%, rgba(255, 255, 255, 0.86) 0%, rgba(255, 255, 255, 0) 52%),
      radial-gradient(88% 130% at 100% 120%, rgba(180, 209, 255, 0.32) 0%, rgba(180, 209, 255, 0) 68%),
      linear-gradient(155deg, rgba(255, 255, 255, 0.52) 0%, rgba(232, 240, 255, 0.2) 48%, rgba(255, 255, 255, 0.42) 100%);
    --nav-shadow:
      0 20px 42px rgba(21, 32, 55, 0.2),
      0 5px 12px rgba(36, 52, 84, 0.08),
      0 1px 0 rgba(255, 255, 255, 0.86) inset,
      0 -1px 0 rgba(101, 129, 177, 0.13) inset;
    --nav-sheen: linear-gradient(112deg, rgba(255, 255, 255, 0.64) 0%, rgba(255, 255, 255, 0.16) 20%, rgba(255, 255, 255, 0) 42%, rgba(255, 255, 255, 0.1) 66%, rgba(255, 255, 255, 0.48) 100%);
    --nav-glow: radial-gradient(ellipse, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 68%);
    --nav-text-shadow: 0 1px 0 rgba(255, 255, 255, 0.34);
    --nav-pill-border: rgba(255, 255, 255, 0.72);
    --nav-pill-background:
      radial-gradient(140% 138% at 0% -14%, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0) 53%),
      radial-gradient(100% 110% at 110% 120%, rgba(187, 214, 255, 0.42) 0%, rgba(187, 214, 255, 0) 68%),
      linear-gradient(160deg, rgba(255, 255, 255, 0.74) 0%, rgba(233, 242, 255, 0.4) 52%, rgba(255, 255, 255, 0.62) 100%);
    --nav-pill-shadow:
      0 9px 20px rgba(23, 40, 75, 0.17),
      0 2px 4px rgba(33, 49, 81, 0.08),
      0 1px 0 rgba(255, 255, 255, 0.88) inset,
      0 -1px 0 rgba(90, 120, 175, 0.12) inset;
    --nav-pill-sheen: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.08) 72%, rgba(255, 255, 255, 0));
    --nav-pill-glow: radial-gradient(circle, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0) 68%);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      color-scheme: dark;

      --color-bg: #0f1115;
      --color-surface: #181b21;
      --color-brand: #f4f5f7;
      --color-secondary: #242830;
      --color-input: #20242b;
      --color-danger: #ff6b88;
      --color-success: #85d38c;
      --color-warning: #f3c969;
      --color-text: #f1f3f5;
      --color-text-secondary: #b3bac7;
      --color-text-tertiary: #9ca5b3;
      --color-muted: var(--color-text-secondary);
      --color-text-inverse: #111318;
      --color-border: #343945;
      --color-border-light: #707887;
      --color-disabled: #737c8a;
      --color-light-blue: #18273d;
      --color-pale-blue: #203551;
      --color-blue: #78aeff;
      --color-dark-blue: #90caf9;

      --color-badge-neutral-bg: #2a303a;
      --color-badge-neutral-text: #d8dde6;
      --color-badge-indigo-bg: #242a4b;
      --color-badge-indigo-text: #b7c3ff;
      --color-badge-amber-bg: #3a2d12;
      --color-badge-amber-text: #ffd67a;
      --color-badge-cyan-bg: #12343c;
      --color-badge-cyan-text: #75e6f7;
      --color-badge-orange-bg: #402718;
      --color-badge-orange-text: #ffb784;
      --color-badge-sky-bg: #172f45;
      --color-badge-sky-text: #8dd3ff;
      --color-badge-purple-bg: #332442;
      --color-badge-purple-text: #deb1ff;
      --color-badge-teal-bg: #15352f;
      --color-badge-teal-text: #7de0cb;
      --color-badge-rose-bg: #3e2029;
      --color-badge-rose-text: #ff9cb0;
      --color-badge-blue-bg: #1c2f4d;
      --color-badge-blue-text: #8bb9ff;
      --color-badge-slate-bg: #2a3038;
      --color-badge-slate-text: #cbd2dd;
      --color-badge-emerald-bg: #18352a;
      --color-badge-emerald-text: #83e0a6;

      --color-skeleton-base: #292e37;
      --color-skeleton-highlight: #3a414d;
      --color-picker-fade: rgba(24, 27, 33, 0.96);
      --color-picker-transparent: rgba(24, 27, 33, 0);
      --color-handle: rgba(241, 243, 245, 0.24);
      --color-pressed-overlay: rgba(255, 255, 255, 0.1);
      --color-card-pressed-overlay: rgba(255, 255, 255, 0.08);

      --shadow-card: 0 2px 18px rgba(0, 0, 0, 0.3);
      --shadow-modal: 0 14px 32px rgba(0, 0, 0, 0.46);
      --shadow-sheet: 0 -10px 28px rgba(0, 0, 0, 0.42);
      --focus-ring: 0 0 0 3px rgba(120, 174, 255, 0.42);

      --nav-label: #a6afbd;
      --nav-border: rgba(255, 255, 255, 0.13);
      --nav-background:
        radial-gradient(128% 150% at 8% -34%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 52%),
        radial-gradient(88% 130% at 100% 120%, rgba(69, 112, 176, 0.2) 0%, rgba(69, 112, 176, 0) 68%),
        linear-gradient(155deg, rgba(38, 43, 52, 0.9) 0%, rgba(22, 26, 33, 0.82) 52%, rgba(35, 40, 49, 0.88) 100%);
      --nav-shadow:
        0 20px 42px rgba(0, 0, 0, 0.46),
        0 5px 12px rgba(0, 0, 0, 0.24),
        0 1px 0 rgba(255, 255, 255, 0.12) inset,
        0 -1px 0 rgba(0, 0, 0, 0.34) inset;
      --nav-sheen: linear-gradient(112deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 20%, rgba(255, 255, 255, 0) 44%, rgba(120, 174, 255, 0.05) 68%, rgba(255, 255, 255, 0.09) 100%);
      --nav-glow: radial-gradient(ellipse, rgba(120, 174, 255, 0.1) 0%, rgba(120, 174, 255, 0) 68%);
      --nav-text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
      --nav-pill-border: rgba(255, 255, 255, 0.18);
      --nav-pill-background:
        radial-gradient(140% 138% at 0% -14%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 53%),
        radial-gradient(100% 110% at 110% 120%, rgba(96, 151, 232, 0.22) 0%, rgba(96, 151, 232, 0) 68%),
        linear-gradient(160deg, rgba(62, 68, 80, 0.9) 0%, rgba(40, 46, 56, 0.82) 52%, rgba(53, 59, 70, 0.88) 100%);
      --nav-pill-shadow:
        0 9px 20px rgba(0, 0, 0, 0.36),
        0 2px 4px rgba(0, 0, 0, 0.22),
        0 1px 0 rgba(255, 255, 255, 0.16) inset,
        0 -1px 0 rgba(0, 0, 0, 0.28) inset;
      --nav-pill-sheen: linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.03) 72%, rgba(255, 255, 255, 0));
      --nav-pill-glow: radial-gradient(circle, rgba(120, 174, 255, 0.18) 0%, rgba(120, 174, 255, 0) 68%);
    }
  }

  /* Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    -webkit-text-size-adjust: 100%;
    font-size: 16px;
    background: var(--color-bg);
  }

  body {
    margin: 0;
    background: var(--color-bg);
    color: var(--color-text);
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
      "Noto Sans KR", "Helvetica Neue", Arial, "Apple SD Gothic Neo", "Malgun Gothic",
      sans-serif;
    line-height: 1.5;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  
  /* HTML5 display reset */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section { display: block; }

  /* 특정 라이브러리 리셋 필요 시 (의도된 경우 유지) */
  .wordCloud > div * { all: revert-layer; }

  ol, ul, li { list-style: none; margin: 0; padding: 0; }
  blockquote, q { quotes: none; }
  table { border-collapse: collapse; border-spacing: 0; }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  button {
    color: inherit;
    cursor: pointer;
    background-color: transparent;
    font: inherit;
    padding: 0;
    border: 0;
    margin: 0;
    outline: none;
    transition:
      transform 0.12s ease,
      filter 0.12s ease,
      background-color 0.2s ease;
  }

  button:active:not(:disabled) {
    transform: scale(0.98);
  }

  button svg { transition: 0.3s; }

  input, textarea, select {
    outline: none;
    border: none;
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
  }
  input { box-sizing: border-box; }

  a {
    color: inherit;       
    text-decoration: none;
    outline: none;
  }
  a:hover, a:active {
    text-decoration: none;
  }

  /* Autofill 색: 전역 변수 사용 (theme 참조 제거) */
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px var(--color-bg) inset;
    -webkit-text-fill-color: var(--color-text);
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }

  /* Focus (접근성) — 인터랙티브 요소로 범위 제한 */
  :where(a, button, input, textarea, select, [role="button"], [tabindex]):focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
    border-radius: 8px;
    transition: box-shadow 0.15s ease;
  }

  /* Scrollbar */
  * { scrollbar-width: thin; scrollbar-color: var(--color-border) transparent; }
  *::-webkit-scrollbar { height: 10px; width: 10px; }
  *::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  *::-webkit-scrollbar-track { background: transparent; }

  /* Typography Utilities */
  .text-muted { color: var(--color-muted); }
  .text-success { color: var(--color-success); }
  .text-warning { color: var(--color-warning); }
  .text-danger  { color: var(--color-danger);  }

  /* Motion Reduce */
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  }
`;
