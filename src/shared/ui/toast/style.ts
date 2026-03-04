import { createGlobalStyle } from "styled-components";

export const ToastGlobalStyle = createGlobalStyle`
  [data-sonner-toaster] {
    pointer-events: auto;
  }

  [data-sonner-toast][data-styled='true'] {
    background: ${({ theme }) => theme.colors.bg.primary} !important;
    color: ${({ theme }) => theme.colors.text.inverseWhite} !important;
    border: none !important;
    border-radius: 16px;
    padding: 18px 24px;
    font-size: 14px !important;
    font-weight: 600;
    font-family: inherit;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  [data-sonner-toast][data-styled='true'] [data-title] {
    font-size: 14px !important;
    line-height: 1.5;
    font-weight: 600;
  }

  [data-sonner-toast][data-styled='true'] [data-description] {
    color: ${({ theme }) => theme.colors.text.inverseWhite};
    opacity: 0.8;
    font-weight: 400;
    font-size: 13px !important;
  }

  [data-sonner-toast][data-type='success'] {
    color: ${({ theme }) => theme.colors.text.inverseWhite} !important;
  }
`;
