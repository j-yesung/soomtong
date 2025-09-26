import sspShouldForwardProp from "@styled-system/should-forward-prop";
import styled, { css } from "styled-components";

import { TextProps } from "./type";

const Text = styled("span").withConfig({
  shouldForwardProp: (prop, target) => (typeof target === "string" ? sspShouldForwardProp(prop) : true),
})<TextProps>`
  ${({ variant, theme }) => {
    switch (variant) {
      case "caption":
        return css`
          color: ${theme.colors.text.secondary};
          font-size: ${theme.font.md};
          font-weight: ${theme.fontWeight.normal};
          line-height: 1.4;
        `;
      default:
        return css`
          color: ${theme.colors.text.primary};
          font-size: ${theme.font.sm};
          font-weight: ${theme.fontWeight.medium};
          line-height: 1.5;
        `;
    }
  }}

  ${({ theme, color }) =>
    color &&
    css`
      color: ${theme.colors.text[color]};
    `}

  ${({ size }) =>
    size &&
    css`
      font-size: ${size}px;
    `}

  ${({ weight }) =>
    weight &&
    css`
      font-weight: ${weight};
    `}
`;

export default Text;
