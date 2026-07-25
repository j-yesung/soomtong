import { createGlobalStyle } from "styled-components";

export const ToastGlobalStyle = createGlobalStyle`
  [data-sonner-toaster] {
    pointer-events: auto;
  }

  [data-sonner-toast][data-styled='true'] {
    background: ${({ theme }) => theme.colors.bg.inverseWhite} !important;
    color: ${({ theme }) => theme.colors.text.primary} !important;
    border-color: ${({ theme }) => theme.colors.border.secondary} !important;
    border-radius: ${({ theme }) => theme.radius.lg} !important;
    font-family: inherit;
    box-shadow: ${({ theme }) => theme.shadows.modal};
  }

  [data-sonner-toast][data-styled='true'] [data-icon] {
    width: 16px;
    height: 16px;
    flex: 0 0 16px;
  }

  [data-sonner-toast][data-styled='true'] [data-description] {
    color: ${({ theme }) => theme.colors.text.secondary} !important;
  }
`;
