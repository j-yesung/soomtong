import { styled } from "styled-components";

import { HeadingTextProps } from "./type";

export const HeadingText = styled.h1<HeadingTextProps>`
  text-align: ${({ $align }) => $align};
  color: ${({ theme, $color }) => theme.colors.text[$color]};

  font-size: ${({ $level }) => {
    switch ($level) {
      case 1:
        return "32px";
      case 2:
        return "24px";
      case 3:
        return "18px";
      case 4:
        return "16px";
      case 5:
        return "14px";
      case 6:
        return "12px";
      default:
        return "16px";
    }
  }};

  font-weight: ${({ $fontWeight }) => {
    switch ($fontWeight) {
      case "light":
        return "300";
      case "normal":
        return "400";
      case "bold":
        return "700";
      default:
        return "500";
    }
  }};
`;
