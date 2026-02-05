
import { Toaster as Sonner } from "sonner";
import styled from "styled-components";

export const Toaster = styled(Sonner)`
  &.toaster.group {
    pointer-events: auto;
  }

  [data-sonner-toast] {
    background: ${({ theme }) => theme.colors.bg.primary} !important;
    color: ${({ theme }) => theme.colors.text.inverseWhite} !important;
    border: none !important;
    border-radius: 12px;
    padding: 16px;
    font-size: 15px;
    font-family: inherit;
  }

  [data-sonner-toast] [data-section="description"] {
    color: ${({ theme }) => theme.colors.text.inverseWhite};
    opacity: 0.7;
  }

  [data-sonner-toast][data-type="success"] {
    color: ${({ theme }) => theme.colors.text.inverseWhite} !important;
  }
`;
