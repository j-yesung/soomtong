import { Sheet } from "react-modal-sheet";
import styled, { css } from "styled-components";

export const SheetContainer = styled(Sheet.Container)`
  width: min(100%, 500px);
  max-height: calc(100svh - 24px);
  margin-inline: auto;
  overflow: hidden;
  border: 1px solid light-dark(rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.13));
  border-bottom: 0;
  border-radius: 28px 28px 0 0;
  background:
    radial-gradient(
      100% 55% at 10% 0%,
      light-dark(rgba(225, 238, 255, 0.72), rgba(84, 132, 199, 0.12)),
      transparent 70%
    ),
    ${({ theme }) => theme.colors.bg.inverseWhite};
  color: ${({ theme }) => theme.colors.text.primary};
  box-shadow: ${({ theme }) => theme.shadows.modal};
`;

export const SheetBackdrop = styled(Sheet.Backdrop)`
  background: rgba(7, 12, 20, 0.48);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
`;

export const SheetHeader = styled(Sheet.Header)`
  padding: 10px 20px 12px;
`;

export const Handle = styled.div`
  width: 40px;
  height: 5px;
  margin: 0 auto 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.border.light};
  opacity: 0.48;
`;

export const Title = styled.h2`
  font-size: 20px;
  line-height: 1.3;
  letter-spacing: -0.02em;
`;

export const SheetContent = styled(Sheet.Content)`
  padding: 0 20px calc(20px + env(safe-area-inset-bottom, 0px));
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SectionTitle = styled.h3`
  padding: 0 2px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: -0.01em;
  margin-bottom: 4px;
`;

export const ThemeFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
`;

export const ThemeOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
`;

export const ThemeOption = styled.label`
  position: relative;
  min-width: 0;
`;

export const ThemeRadio = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  white-space: nowrap;

  &:focus-visible + span {
    box-shadow: ${({ theme }) => theme.shadows.focusRing};
  }
`;

export const ThemeChoice = styled.span<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 82px;
  padding: 12px 6px;
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bg.inverseWhite};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;

  ${({ $isSelected, theme }) =>
    $isSelected &&
    css`
      border-color: ${theme.colors.border.blue};
      background: ${theme.colors.bg.lightBlue};
      color: ${theme.colors.text.darkBlue};
      font-weight: ${theme.fontWeight.bold};
    `}

  @media (hover: hover) {
    &:hover {
      transform: translateY(-1px);
      border-color: ${({ theme }) => theme.colors.border.blue};
    }
  }
`;

export const ActionList = styled.div`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border.secondary};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bg.inverseWhite};
`;

export const ActionButton = styled.button<{ $isDanger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 64px;
  padding: 12px 14px;
  text-align: left;
  color: ${({ $isDanger, theme }) => ($isDanger ? theme.colors.bg.danger : theme.colors.text.primary)};

  &:disabled {
    color: ${({ theme }) => theme.colors.text.secondary};
    cursor: default;
  }

  @media (hover: hover) {
    &:not(:disabled):hover {
      background: ${({ theme }) => theme.colors.bg.secondary};
    }
  }
`;

export const ActionIcon = styled.span<{ $isDanger?: boolean; $isDisabled?: boolean }>`
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 41px;
  height: 41px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $isDanger, $isDisabled, theme }) =>
    $isDanger
      ? `color-mix(in srgb, ${theme.colors.bg.danger} 12%, transparent)`
      : $isDisabled
        ? theme.colors.bg.secondary
        : theme.colors.bg.lightBlue};
  color: ${({ $isDanger, $isDisabled, theme }) =>
    $isDanger ? theme.colors.bg.danger : $isDisabled ? theme.colors.text.secondary : theme.colors.text.darkBlue};
`;

export const ActionCopy = styled.span`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 2px;
`;

export const ActionTitle = styled.span`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const ActionDescription = styled.span`
  overflow-wrap: anywhere;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 12px;
`;
