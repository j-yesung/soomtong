import sspShouldForwardProp from "@styled-system/should-forward-prop";
import styled, { css } from "styled-components";

import { TextProps } from "./type";

const Text = styled("span").withConfig({
  shouldForwardProp: (prop, target) => (typeof target === "string" ? sspShouldForwardProp(prop) : true),
})<TextProps>`
  ${({ variant }) => {
    switch (variant) {
      case "caption":
        return css`
          color: ${({ theme }) => theme.colors.text.secondary};
          font-size: ${({ theme }) => theme.font.base};
          font-weight: ${({ theme }) => theme.fontWeight.normal};
          line-height: 1.4;
        `;
      default:
        return css`
          color: ${({ theme }) => theme.colors.text.primary};
          font-size: ${({ theme }) => theme.font.sm}
          font-weight: ${({ theme }) => theme.fontWeight.medium};
          line-height: 1.5;
        `;
    }
  }}

  color: ${({ theme, color }) => color && theme.colors.text[color]};
  font-size: ${({ size }) => size && `${size}px`};
  font-weight: ${({ weight }) => weight && 500};
`;

export default Text;
