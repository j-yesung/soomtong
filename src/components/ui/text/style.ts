import sspShouldForwardProp from "@styled-system/should-forward-prop";
import styled from "styled-components";
import { TypographyProps, typography } from "styled-system";

const Text = styled("span").withConfig({
  shouldForwardProp: (prop, target) => (typeof target === "string" ? sspShouldForwardProp(prop) : true),
})<TypographyProps>`
  ${typography}
`;

export default Text;
