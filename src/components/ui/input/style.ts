import { css, styled } from "styled-components";

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
    }
  }}

    ${({ $inputStyle }) =>
    $inputStyle === "salary" &&
    css`
      font-weight: bold;
      letter-spacing: 0.1em;
      font-size: 24px;

      &::placeholder {
        color: #999;
        font-weight: normal;
        letter-spacing: normal;
        font-size: 16px;
      }
    `};
`;
