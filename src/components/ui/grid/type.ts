import type React from "react";

import type {
  BorderProps,
  ColorProps,
  LayoutProps,
  PositionProps,
  GridProps as SSGridProps,
  SpaceProps,
} from "styled-system";

export type StyledSystemBaseProps = SSGridProps & LayoutProps & SpaceProps & ColorProps & BorderProps & PositionProps;

export type GridProps = StyledSystemBaseProps & {
  cols?: number;
  gap?: number;
  minColWidth?: string | number;
  children?: React.ReactNode;
};

export type GridItemProps = StyledSystemBaseProps & {
  col?: number;
  row?: number;
  children?: React.ReactNode;
};
