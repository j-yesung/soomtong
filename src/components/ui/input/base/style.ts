import styled, { css } from "styled-components";

import { InputStyleProps } from "./type";

export const Input = styled.input<InputStyleProps>`
  border: none;
  outline: none;
  border-radius: 8px;
  padding: 8px;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${({ theme, $inputSize }) => {
    switch ($inputSize) {
      case "s":
        return css`
          font-size: ${theme.font.sm};
        `;
      case "m":
        return css`
          font-size: ${theme.font.md};
        `;
      case "l":
        return css`
          font-size: ${theme.font.base};
        `;
    }
  }}

  ${({ theme, $variant }) => {
    switch ($variant) {
      case "outline":
        return css`
          border: 1px solid ${theme.colors.border.secondary};
          background: transparent;
          padding-right: 40px;
        `;
      case "filled":
        return css`
          border: 1px solid transparent;
          background: #f0f0f0;
        `;
      case "underline":
        return css`
          border-bottom: 1px solid ${theme.colors.border.secondary};
          padding: 4px 0;

          &:focus {
            border-radius: 0;
          }
        `;
      default:
        return css`
          border: none;
          background: transparent;
        `;
    }
  }}

    ${({ $inputStyle }) =>
    $inputStyle === "salary" &&
    css`
      width: 100%;
      flex: 1;
      padding: 0;
      font-size: 28px;
      font-weight: 800;
      height: auto;
      letter-spacing: normal;
      background: transparent;

      &::placeholder {
        color: #999;
        font-weight: normal;
        letter-spacing: normal;
      }
    `};
`;

export const Unit = styled.span`
  position: absolute;
  right: 16px;
  font-size: 14px;
  color: #666;
  pointer-events: none;
`;
