import { Box, Column } from "@/components/ui";
import CalendarScreen from "@/screen/calendar/calendarScreen";

export default function CalendarPage() {
  return (
    <Box position="relative">
      <Column gap={12}>
        <CalendarScreen />
      </Column>
    </Box>
  );
}
