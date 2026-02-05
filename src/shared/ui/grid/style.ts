import shouldForwardProp from "@styled-system/should-forward-prop";
import styled from "styled-components";
import { border, color, compose, grid as gridSystem, layout, position, space, system } from "styled-system";

import { StyledSystemBaseProps } from "./type";

const extra = system({
  gap: { property: "gap", scale: "space" },
  placeItems: true,
  placeContent: true,
  placeSelf: true,
});

const gridStyles = compose(gridSystem, layout, space, color, border, position, extra);

export const StyledGrid = styled("div").withConfig({ shouldForwardProp })<StyledSystemBaseProps>`
  ${gridStyles}

  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
`;

export const StyledGridItem = styled("div").withConfig({ shouldForwardProp })<StyledSystemBaseProps>(gridStyles);
