import styled from "styled-components";

export const CalendarWrapper = styled.div`
  .rdp {
    --rdp-cell-size: 44px;
    --rdp-accent-color: #34c759;
    --rdp-accent-background-color: #34c759;
    margin: 0;
    font-family: inherit;
  }

  .rdp-root {
    width: 100%;
  }

  .rdp-month table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .rdp-month_caption {
    display: flex;
    justify-content: center;
    padding: 16px 0;
    font-size: 18px;
    font-weight: 600;
  }

  .rdp-nav {
    display: flex;
    gap: 8px;
  }

  .rdp-button_previous,
  .rdp-button_next {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 8px;
    color: #666;

    &:hover {
      background: #f5f5f5;
    }
  }

  .rdp-weekdays {
    display: table-row;
  }

  .rdp-weekday {
    display: table-cell;
    width: calc(100% / 7);
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    color: #8e8e93;
    padding: 8px 0;

    &:first-child {
      color: #ff3b30;
    }

    &:last-child {
      color: #007aff;
    }
  }

  .rdp-weeks {
    display: table-row-group;
  }

  .rdp-week {
    display: table-row;
  }

  .rdp-day {
    display: table-cell;
    width: calc(100% / 7);
    height: var(--rdp-cell-size);
    text-align: center;
    vertical-align: middle;
    padding: 4px 0;
  }

  .rdp-day_button {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 50%;
    font-size: 15px;
    font-weight: 400;
    color: #1a1a1a;
    transition: all 0.15s ease;

    &:hover {
      background: #f5f5f5;
    }
  }

  .rdp-day_sunday .rdp-day_button {
    color: #ff3b30;
  }

  .rdp-day_saturday .rdp-day_button {
    color: #007aff;
  }

  .rdp-outside .rdp-day_button {
    color: #c7c7cc;
  }

  .rdp-selected .rdp-day_button {
    font-weight: 500;
  }

  .rdp-today .rdp-day_button {
    font-weight: 700;
    color: #34c759;
  }

  .rdp-today.rdp-selected .rdp-day_button {
    color: #34c759;
  }
`;

export const DayCell = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  font-size: 15px;
  font-weight: 400;
  color: inherit;
  transition: all 0.15s ease;
  padding: 0;

  &:hover {
    background: #f5f5f5;
  }
`;

export const DayNumber = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  z-index: 1;

  .rdp-selected & {
    color: #fff;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: ${({ theme }) => theme.colors.text.primary};
      border-radius: 50%;
      z-index: -1;
    }
  }

  .rdp-selected.rdp-day_sunday & {
    &::before {
      background-color: #ff6b6b;
    }
  }

  .rdp-selected.rdp-day_saturday & {
    &::before {
      background-color: #4dabf7;
    }
  }

  .rdp-today.rdp-selected & {
    &::before {
      background-color: #34c759;
    }
  }
`;

export const DotContainer = styled.div`
  display: flex;
  gap: 2px;
  min-height: 6px;
  align-items: center;
`;

export const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #007aff;
`;

export const FixedDot = styled(Dot)`
  background-color: #007aff;
`;

export const VariableDot = styled(Dot)`
  background-color: #34c759;
`;
