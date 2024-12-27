export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood?: 'happy' | 'neutral' | 'sad';
}

export interface CalendarDay {
  date: Date;
  hasEntry: boolean;
  entry?: JournalEntry;
}