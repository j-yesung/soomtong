
import shouldForwardProp from "@styled-system/should-forward-prop";
import styled, { css } from "styled-components";

import { TextProps } from "./type";

const Text = styled("span").withConfig({ shouldForwardProp })<TextProps>`
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

    ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}
`;

export default Text;
