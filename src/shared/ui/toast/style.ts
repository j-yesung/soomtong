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
    border-radius: 16px;
    padding: 18px 24px;
    font-size: 16px;
    font-weight: 600;
    font-family: inherit;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  [data-sonner-toast] [data-section="description"] {
    color: ${({ theme }) => theme.colors.text.inverseWhite};
    opacity: 0.8;
    font-weight: 400;
  }

  [data-sonner-toast][data-type="success"] {
    color: ${({ theme }) => theme.colors.text.inverseWhite} !important;
  }
`;
