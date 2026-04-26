import { useContext } from 'react';
import { EventContext } from '../context/EventContext';

export function useEvents() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error('useEvents debe usarse dentro de un EventProvider');
  }

  const { events, loading, error } = context.state;
  const { reloadEvents } = context;

  return {
    events,
    loading,
    error,
    reloadEvents,
  };
}
