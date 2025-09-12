"use client";

import Box from "../box/style";

export interface FlexProps extends Omit<React.ComponentProps<typeof Box>, "display"> {
  direction?: "row" | "column";
  justify?: React.CSSProperties["justifyContent"];
  align?: React.CSSProperties["alignItems"];
  wrap?: React.CSSProperties["flexWrap"];
  gap?: number;
  fullWidth?: boolean;
  children?: React.ReactNode;
  as?: React.ElementType;
}

export default function Flex({
  direction = "row",
  justify,
  align,
  wrap,
  gap,
  fullWidth,
  as,
  children,
  ...rest
}: FlexProps) {
  return (
    <Box
      {...rest}
      display="flex"
      as={as}
      flexDirection={direction}
      justifyContent={justify}
      alignItems={align}
      flexWrap={wrap}
      gap={gap}
      width={fullWidth ? "100%" : rest.width}
    >
      {children}
    </Box>
  );
}
