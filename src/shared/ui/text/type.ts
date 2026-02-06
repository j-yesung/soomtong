import { JSX } from "react";

import { AppTheme } from "@/shared/styles/theme";

type Variant = "caption";

export interface TextProps {
  as?: keyof JSX.IntrinsicElements;
  variant?: Variant;
  color?: keyof AppTheme["colors"]["text"];
  size?: number;
  weight?: number;
  align?: "left" | "center" | "right";
}
