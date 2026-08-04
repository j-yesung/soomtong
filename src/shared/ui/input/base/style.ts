import styled, { css } from "styled-components";

import { InputStyleProps } from "./type";

export const Input = styled.input<InputStyleProps>`
  appearance: none;
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
          font-size: max(16px, ${theme.font.sm});
        `;
      case "m":
        return css`
          font-size: ${theme.font.md};
        `;
      case "l":
        return css`
          font-size: ${theme.font.lg};
        `;
    }
  }}

  ${({ theme, $variant }) => {
    switch ($variant) {
      case "outline":
        return css`
          border: 1px solid ${theme.colors.border.secondary};
          background: transparent;
          min-height: 50px;
          padding: 12px 40px 12px 14px;
          border-radius: ${theme.radius.md};
        `;
      case "filled":
        return css`
          border: 1px solid transparent;
          background: ${theme.colors.bg.input};
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
      min-height: 60px;
      padding: 12px 52px 12px 16px;
      font-size: 26px;
      font-weight: 800;
      height: auto;
      letter-spacing: normal;
      background: transparent;

      &::placeholder {
        color: ${({ theme }) => theme.colors.text.tertiary};
        font-weight: normal;
        letter-spacing: normal;
      }
    `};
`;

export const Unit = styled.span`
  position: absolute;
  right: 16px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text.secondary};
  pointer-events: none;
`;
