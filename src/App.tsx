import React, { useState } from 'react';
import { JournalEntry } from './components/JournalEntry';
import { Calendar } from './components/Calendar';
import { Header } from './components/Header';
import { useJournalEntries } from './hooks/useJournalEntries';
import { getMonthDays } from './utils/calendar';

export function App() {
  const { entries, handleSaveEntry, deleteEntry, getEntryForDate } = useJournalEntries();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Header />

        <JournalEntry
          onSave={handleSaveEntry}
          onDelete={deleteEntry}
          existingEntry={getEntryForDate(selectedDate)?.content}
          selectedDate={selectedDate}
        />

        <Calendar
          days={getMonthDays(selectedDate, entries)}
          onDayClick={(day) => setSelectedDate(day.date)}
        />
      </div>
    </div>
  );
}