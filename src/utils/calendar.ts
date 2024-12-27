import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { JournalEntry, CalendarDay } from '../types';

export function getMonthDays(selectedDate: Date, entries: JournalEntry[]): CalendarDay[] {
  const start = startOfMonth(selectedDate);
  const end = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start, end });

  return days.map((date) => {
    const entry = entries.find((e) => e.date === format(date, 'yyyy-MM-dd'));
    return {
      date,
      hasEntry: !!entry,
      entry,
    };
  });
}