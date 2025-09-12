import { JSX } from "react";

import { AppTheme } from "@/styles/theme";

type Variant = "caption";

export interface TextProps {
  as?: keyof JSX.IntrinsicElements;
  variant?: Variant;
  color?: keyof AppTheme["colors"]["text"];
  size?: number;
  weight?: number;
}
