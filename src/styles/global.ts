"use client";

import { createGlobalStyle } from "styled-components";

/**
 * - 가벼운 Reset
 * - CSS 변수 기반 라이트/다크 테마 (prefers-color-scheme)
 * - 타이포/링크/버튼/스크롤바/포커스/컨테이너 유틸
 * - 시스템 폰트 스택 + 한글 가독성 개선
 */
export const GlobalStyle = createGlobalStyle`
  :root {
    --color-bg: #ffffff;
    --color-text: #111315;
    --color-muted: #6b7280;
    --color-border: #e5e7eb;

    --color-primary: #2563eb;
    --color-on-primary: #ffffff;

    --color-success: #16a34a;
    --color-warning: #d97706;
    --color-danger: #dc2626;

    --focus-ring: 0 0 0 3px rgba(37, 99, 235, 0.35);
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-bg: #0b0e11;
      --color-text: #e5e7eb;
      --color-muted: #9ca3af;
      --color-border: #1f2937;

      --color-primary: #3b82f6;
      --color-on-primary: #0b0e11;

      --color-success: #22c55e;
      --color-warning: #f59e0b;
      --color-danger: #ef4444;

      --focus-ring: 0 0 0 3px rgba(59, 130, 246, 0.45);
    }
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

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

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
    color: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /* ===== Focus (접근성) ===== */
  :focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
    border-radius: 8px;
    transition: box-shadow 0.15s ease;
  }

  /* ===== Scrollbar (WebKit) ===== */
  * {
    scrollbar-width: thin;
    scrollbar-color: var(--color-border) transparent;
  }
  *::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }
  *::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  *::-webkit-scrollbar-track {
    background: transparent;
  }

  /* ===== Typography Utilities ===== */
  .text-muted { color: var(--color-muted); }
  .text-success { color: var(--color-success); }
  .text-warning { color: var(--color-warning); }
  .text-danger  { color: var(--color-danger); }


  /* ===== Motion Reduce ===== */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
`;
