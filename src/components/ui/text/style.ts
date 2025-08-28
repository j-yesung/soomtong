import sspShouldForwardProp from "@styled-system/should-forward-prop";
import styled from "styled-components";
import { TypographyProps, color, typography } from "styled-system";

const Text = styled("span").withConfig({
  shouldForwardProp: (prop, target) => (typeof target === "string" ? sspShouldForwardProp(prop) : true),
})<TypographyProps>`
  ${typography}
  ${color}
`;

export default Text;
