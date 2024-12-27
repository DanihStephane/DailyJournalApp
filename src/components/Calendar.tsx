import React from 'react';
import { CalendarDay } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Props {
  days: CalendarDay[];
  onDayClick: (day: CalendarDay) => void;
}

export function Calendar({ days, onDayClick }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {format(days[0].date, 'MMMM yyyy', { locale: fr })}
      </h2>
      <div className="grid grid-cols-7 gap-1">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
          <div key={day} className="text-center text-sm text-gray-500 py-2">
            {day}
          </div>
        ))}
        {days.map((day, i) => (
          <button
            key={i}
            onClick={() => onDayClick(day)}
            className={`
              aspect-square p-2 rounded-lg text-sm
              ${day.hasEntry ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}
              ${format(new Date(), 'yyyy-MM-dd') === format(day.date, 'yyyy-MM-dd') ? 'ring-2 ring-blue-500' : ''}
            `}
          >
            {format(day.date, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
}