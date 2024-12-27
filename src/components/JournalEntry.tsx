import React, { useState, useEffect } from 'react';
import { Save, Trash2 } from 'lucide-react';

interface Props {
  onSave: (content: string, mood: 'happy' | 'neutral' | 'sad') => void;
  onDelete?: (date: string) => void;
  existingEntry?: string;
  selectedDate: Date;
}

export function JournalEntry({ onSave, onDelete, existingEntry, selectedDate }: Props) {
  const [content, setContent] = useState(existingEntry || '');
  const [mood, setMood] = useState<'happy' | 'neutral' | 'sad'>('neutral');

  useEffect(() => {
    setContent(existingEntry || '');
  }, [existingEntry, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSave(content, mood);
      if (!existingEntry) setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            {selectedDate.toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h2>
          <div className="flex gap-2">
            {['happy', 'neutral', 'sad'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m as 'happy' | 'neutral' | 'sad')}
                className={`p-2 rounded-full ${
                  mood === m ? 'bg-blue-100 text-blue-600' : 'text-gray-400'
                }`}
              >
                {m === 'happy' ? '😊' : m === 'neutral' ? '😐' : '😔'}
              </button>
            ))}
          </div>
        </div>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Comment s'est passée votre journée ?"
          className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          maxLength={280}
        />
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {280 - content.length} caractères restants
          </span>
          <div className="flex gap-2">
            {existingEntry && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(selectedDate.toISOString().split('T')[0])}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 size={18} />
                Supprimer
              </button>
            )}
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={18} />
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}