import type {
  BorderProps,
  ColorProps,
  FlexboxProps,
  GridProps,
  LayoutProps,
  PositionProps,
  ResponsiveValue,
  ShadowProps,
  SpaceProps,
} from "styled-system";

export type SystemProps = SpaceProps &
  LayoutProps &
  ColorProps &
  FlexboxProps &
  GridProps &
  PositionProps &
  BorderProps &
  ShadowProps;

export type ExtraProps = {
  gap?: ResponsiveValue<string | number>;
  rowGap?: ResponsiveValue<string | number>;
  columnGap?: ResponsiveValue<string | number>;
  overflow?: React.CSSProperties["overflow"];
  overflowX?: React.CSSProperties["overflowX"];
  overflowY?: React.CSSProperties["overflowY"];
  userSelect?: React.CSSProperties["userSelect"];
  pointerEvents?: React.CSSProperties["pointerEvents"];
  cursor?: React.CSSProperties["cursor"];
  boxSizing?: React.CSSProperties["boxSizing"];
  centerScreen?: boolean;
};

export type BoxProps = SystemProps & ExtraProps;
