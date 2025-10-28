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
    --color-brand: #2D2D2D;
    --color-secondary: #F8F8F8;
    --color-danger: #EB003B;
    --color-success: #74B075;
    --color-inverseWhite: #FFFFFF;
    --color-border: #e5e7eb;
    --color-disabled: #9ca3af;
    --color-bg-secondary: #F8F8F8;
    --color-text-secondary: #6b7280;

    --color-light-blue: #E6F0FF;
    --color-blue: #3B82F6;
    
  }

  /* Dark scheme */
  /* @media (prefers-color-scheme: dark) {
    :root {
      --color-bg: #FFFFFF;
      --color-text: #111315;
      --color-border: #1f2937;

      --color-text-primary: var(--color-text);
      --color-text-secondary: #9ca3af;
      --color-muted: #9ca3af;

      --color-primary: #3b82f6;
      --color-on-primary: #0b0e11;

      --color-success: #22c55e;
      --color-warning: #f59e0b;
      --color-danger: #ef4444;

      --focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.45);
    }
  } */

  /* Reset */
  *, *::before, *::after { box-sizing: border-box; }

  html {
    -webkit-text-size-adjust: 100%;
    font-size: 16px;
    height: 100%;
  }

  body {
    margin: 0;
    height: 100%;
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
    transition: 0.3s;
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
