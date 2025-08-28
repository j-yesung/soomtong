import styled, { css } from "styled-components";

import { InputStyleProps } from "./type";

export const Input = styled.input<InputStyleProps>`
  border: none;
  outline: none;
  padding: 12px 16px;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  ${({ $inputSize }) => {
    switch ($inputSize) {
      case "s":
        return css`
          font-size: 12px;
        `;
      case "m":
        return css`
          font-size: 14px;
        `;
      case "l":
        return css`
          font-size: 16px;
        `;
    }
  }}

  ${({ $variant }) => {
    switch ($variant) {
      case "outline":
        return css`
          border: 1px solid #ccc;
          background: transparent;
        `;
      case "filled":
        return css`
          border: 1px solid transparent;
          background: #f0f0f0;
        `;
      case "underline":
        return css`
          border-bottom: 1px solid #ccc;
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
