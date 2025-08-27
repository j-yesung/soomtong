import sspShouldForwardProp from "@styled-system/should-forward-prop";
import styled from "styled-components";
import { border, color, compose, flexbox, grid, layout, position, shadow, space, system } from "styled-system";

import { BoxProps } from "./type";

const extra = system({
  gap: { property: "gap", scale: "space" },
  rowGap: { property: "rowGap", scale: "space" },
  columnGap: { property: "columnGap", scale: "space" },
  overflow: true,
  overflowX: true,
  overflowY: true,
  userSelect: true,
  pointerEvents: true,
  cursor: true,
  boxSizing: true,
});

const sx = compose(space, layout, color, flexbox, grid, position, border, shadow, extra);

const Box = styled("div").withConfig({
  shouldForwardProp: (prop, target) => (typeof target === "string" ? sspShouldForwardProp(prop) : true),
})<BoxProps>`
  ${sx}
`;

export default Box;
