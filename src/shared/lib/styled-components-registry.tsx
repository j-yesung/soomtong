"use client";

import React, { useState } from "react";

import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

/**
 * SSR 시 styled-components의 스타일을 서버에서 추출/주입해주는 레지스트리
 * 서버에서는 ServerStyleSheet로 수집하고, useServerInsertedHTML로 주입
 * 클라이언트에서는 그냥 children 렌더
 */
export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // 클라이언트 환경에선 StyleSheetManager가 필요 없음
  if (typeof window !== "undefined") {
    return <>{children}</>;
  }

  return <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>;
}
