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
    color-scheme: light dark;

    --color-bg: light-dark(#ffffff, #0f1115);
    --color-surface: light-dark(#ffffff, #181b21);
    --color-brand: light-dark(#2d2d2d, #f4f5f7);
    --color-secondary: light-dark(#f5f6f8, #242830);
    --color-input: light-dark(#f0f1f3, #20242b);
    --color-danger: light-dark(#d7194b, #ff6b88);
    --color-success: light-dark(#3f7d43, #85d38c);
    --color-warning: light-dark(#8a6100, #f3c969);
    --color-text: light-dark(#25272b, #f1f3f5);
    --color-text-secondary: light-dark(#626a76, #b3bac7);
    --color-text-tertiary: light-dark(#717987, #9ca5b3);
    --color-text-inverse: light-dark(#ffffff, #111318);
    --color-border: light-dark(#dfe3e8, #343945);
    --color-border-light: light-dark(#8a929f, #707887);
    --color-disabled: light-dark(#8a929f, #737c8a);
    --color-light-blue: light-dark(#eef5ff, #18273d);
    --color-pale-blue: light-dark(#e3f2fd, #203551);
    --color-blue: light-dark(#2563eb, #78aeff);
    --color-dark-blue: light-dark(#1976d2, #90caf9);

    --color-badge-neutral-bg: light-dark(#eceff3, #2a303a);
    --color-badge-neutral-text: light-dark(#56606f, #d8dde6);
    --color-badge-indigo-bg: light-dark(#eef2ff, #242a4b);
    --color-badge-indigo-text: light-dark(#4338ca, #b7c3ff);
    --color-badge-amber-bg: light-dark(#fef3c7, #3a2d12);
    --color-badge-amber-text: light-dark(#92400e, #ffd67a);
    --color-badge-cyan-bg: light-dark(#cffafe, #12343c);
    --color-badge-cyan-text: light-dark(#0e7490, #75e6f7);
    --color-badge-orange-bg: light-dark(#ffedd5, #402718);
    --color-badge-orange-text: light-dark(#c2410c, #ffb784);
    --color-badge-sky-bg: light-dark(#e0f2fe, #172f45);
    --color-badge-sky-text: light-dark(#0369a1, #8dd3ff);
    --color-badge-purple-bg: light-dark(#f3e8ff, #332442);
    --color-badge-purple-text: light-dark(#7e22ce, #deb1ff);
    --color-badge-teal-bg: light-dark(#ccfbf1, #15352f);
    --color-badge-teal-text: light-dark(#0f766e, #7de0cb);
    --color-badge-rose-bg: light-dark(#ffe4e6, #3e2029);
    --color-badge-rose-text: light-dark(#be123c, #ff9cb0);
    --color-badge-blue-bg: light-dark(#dbeafe, #1c2f4d);
    --color-badge-blue-text: light-dark(#1d4ed8, #8bb9ff);
    --color-badge-slate-bg: light-dark(#e2e8f0, #2a3038);
    --color-badge-slate-text: light-dark(#475569, #cbd2dd);
    --color-badge-emerald-bg: light-dark(#d1fae5, #18352a);
    --color-badge-emerald-text: light-dark(#047857, #83e0a6);

    --color-skeleton-base: light-dark(#e5e7eb, #292e37);
    --color-skeleton-highlight: light-dark(#f3f4f6, #3a414d);
    --color-picker-fade: light-dark(rgba(255, 255, 255, 0.95), rgba(24, 27, 33, 0.96));
    --color-picker-transparent: light-dark(rgba(255, 255, 255, 0), rgba(24, 27, 33, 0));
    --color-handle: light-dark(rgba(37, 39, 43, 0.2), rgba(241, 243, 245, 0.24));
    --color-pressed-overlay: light-dark(rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.09));

    --shadow-card: 0 2px 18px light-dark(rgba(15, 23, 42, 0.06), rgba(0, 0, 0, 0.3));
    --shadow-modal: 0 12px 28px light-dark(rgba(15, 23, 42, 0.14), rgba(0, 0, 0, 0.46));
    --shadow-sheet: 0 -8px 24px light-dark(rgba(15, 23, 42, 0.15), rgba(0, 0, 0, 0.42));
    --focus-ring: 0 0 0 3px light-dark(rgba(37, 99, 235, 0.34), rgba(120, 174, 255, 0.42));
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
  .text-muted { color: var(--color-text-secondary); }
  .text-success { color: var(--color-success); }
  .text-warning { color: var(--color-warning); }
  .text-danger  { color: var(--color-danger);  }

  /* Motion Reduce */
  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  }
`;
