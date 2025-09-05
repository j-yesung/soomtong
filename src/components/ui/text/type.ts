import { JSX } from "react";

import { ColorsKeys } from "@/styles/theme";

type Variant = "body" | "caption";

export interface TextProps {
  as?: keyof JSX.IntrinsicElements;
  variant?: Variant;
  color?: ColorsKeys;
  size?: number;
  weight?: number;
}
