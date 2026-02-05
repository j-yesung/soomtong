import { PropsWithChildren } from "react";

import { AppTheme } from "@/shared/styles/theme";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingAlign = "left" | "center" | "right";

export type HeadingFontWeight = "light" | "normal" | "bold";

export interface HeadingProps extends PropsWithChildren {
  children: React.ReactNode;
  level: HeadingLevel;
  align?: HeadingAlign;
  color?: keyof AppTheme["colors"]["text"];
  fontWeight?: HeadingFontWeight;
}

export interface HeadingTextProps {
  $level: HeadingLevel;
  $align: HeadingAlign;
  $color: keyof AppTheme["colors"]["text"];
  $fontWeight: HeadingFontWeight;
}
