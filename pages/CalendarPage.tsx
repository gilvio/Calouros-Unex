
import React from 'react';
import { AppEvent } from '../types';
import { EVENTS } from '../constants';

const eventTypeStyles = {
    exam: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-500' },
    event: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500' },
    deadline: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-500' },
    registration: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-500' },
};

const EventCard: React.FC<{ event: AppEvent }> = ({ event }) => {
    const styles = eventTypeStyles[event.type];
    const formattedDate = event.start.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    const formattedTime = event.start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`flex items-start p-4 rounded-lg shadow-sm border-l-4 ${styles.border} ${styles.bg}`}>
            <div className="flex flex-col items-center justify-center mr-4">
                <span className="text-xl font-bold text-neutral-dark">{formattedDate.split(' ')[0]}</span>
                <span className="text-sm text-gray-600">{formattedDate.split(' ')[2]}.</span>
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <h3 className={`font-bold ${styles.text}`}>{event.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles.bg} ${styles.text}`}>{event.type.toUpperCase()}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">
                    {formattedTime} {event.end.getTime() !== event.start.getTime() ? ` - ${event.end.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}` : ''}
                </p>
                <p className="text-sm text-gray-600">Local: {event.location}</p>
                 <div className="mt-2 text-right">
                    <button className="text-xs font-semibold text-secondary hover:underline">Adicionar ao Google Calendar</button>
                </div>
            </div>
        </div>
    );
};

export const CalendarPage: React.FC = () => {
    const sortedEvents = [...EVENTS].sort((a, b) => a.start.getTime() - b.start.getTime());

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-neutral-dark">Calendário Acadêmico</h2>
            <div className="space-y-4">
                {sortedEvents.length > 0 ? (
                    sortedEvents.map(event => <EventCard key={event.id} event={event} />)
                ) : (
                    <p className="text-gray-600">Nenhum evento agendado no momento.</p>
                )}
            </div>
        </div>
    );
};
