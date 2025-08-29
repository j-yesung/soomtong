import sspShouldForwardProp from "@styled-system/should-forward-prop";
import styled, { css } from "styled-components";

import { TextProps } from "./type";

const Text = styled("span").withConfig({
  shouldForwardProp: (prop, target) => (typeof target === "string" ? sspShouldForwardProp(prop) : true),
})<TextProps>`
  ${({ variant }) => {
    switch (variant) {
      case "body":
        return css`
          font-size: ${({ theme }) => theme.font.md}
          line-height: 1.5;
          font-weight: ${({ theme }) => theme.fontWeight.normal};
        `;
      case "caption":
        return css`
          font-size: ${({ theme }) => theme.font.sm}
          line-height: 1.4;
          font-weight: ${({ theme }) => theme.fontWeight.normal};
        `;
      default:
        return css`
          font-size: ${({ theme }) => theme.font.base}
          line-height: 1.5;
        `;
    }
  }}

  color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.text)};
  font-size: ${({ theme, size }) => (size ? `${size}px` : theme.font.base)};
  font-weight: ${({ weight }) => weight ?? 500};
`;

export default Text;
