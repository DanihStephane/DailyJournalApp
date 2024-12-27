import { useState, useCallback } from 'react';
import { JournalEntry } from '../types';
import { format } from 'date-fns';
import { storageService } from '../services/storage';

export function useJournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => storageService.getEntries());

  const handleSaveEntry = useCallback((content: string, mood: 'happy' | 'neutral' | 'sad') => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: format(new Date(), 'yyyy-MM-dd'),
      content,
      mood,
    };
    
    const updatedEntries = storageService.updateEntry(newEntry);
    setEntries(updatedEntries);
  }, []);

  const deleteEntry = useCallback((date: string) => {
    const updatedEntries = storageService.deleteEntry(date);
    setEntries(updatedEntries);
  }, []);

  const getEntryForDate = useCallback((date: Date) => {
    return entries.find(e => e.date === format(date, 'yyyy-MM-dd'));
  }, [entries]);

  return {
    entries,
    handleSaveEntry,
    deleteEntry,
    getEntryForDate,
  };
}