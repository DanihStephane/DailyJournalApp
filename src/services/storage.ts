import { JournalEntry } from '../types';

const STORAGE_KEY = 'journal-entries';

export const storageService = {
  getEntries(): JournalEntry[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading entries:', error);
      return [];
    }
  },

  saveEntries(entries: JournalEntry[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving entries:', error);
    }
  },

  updateEntry(entry: JournalEntry): JournalEntry[] {
    const entries = this.getEntries();
    const index = entries.findIndex(e => e.date === entry.date);
    
    if (index !== -1) {
      entries[index] = entry;
    } else {
      entries.push(entry);
    }
    
    this.saveEntries(entries);
    return entries;
  },

  deleteEntry(date: string): JournalEntry[] {
    const entries = this.getEntries().filter(e => e.date !== date);
    this.saveEntries(entries);
    return entries;
  }
};