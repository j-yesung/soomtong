import { createContext, useContext } from "react";

import { CalendarViewContextValue } from "../../types";

const CalendarViewContext = createContext<CalendarViewContextValue | null>(null);

export const CalendarViewProvider = CalendarViewContext.Provider;

export const useCalendarViewContext = () => {
  const context = useContext(CalendarViewContext);

  if (!context) {
    throw new Error("CalendarView custom components must be rendered inside CalendarViewContext.");
  }

  return context;
};
