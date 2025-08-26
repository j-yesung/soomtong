export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingAlign = "left" | "center" | "right";

export type HeadingColor = "base" | "description";

export type HeadingFontWeight = "light" | "normal" | "bold";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level: HeadingLevel;
  align?: HeadingAlign;
  color?: HeadingColor;
  fontWeight?: HeadingFontWeight;
}
