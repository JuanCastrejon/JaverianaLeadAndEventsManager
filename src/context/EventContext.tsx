import { createContext, useEffect, useReducer, type ReactNode } from 'react';
import type { EventAction, EventState } from '../types';
import { fetchEvents } from '../services/eventService';

const initialState: EventState = {
  events: [],
  loading: true,
  error: null,
};

function eventReducer(state: EventState, action: EventAction): EventState {
  switch (action.type) {
    case 'SET_EVENTS':
      return {
        ...state,
        events: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

interface EventContextValue {
  state: EventState;
  dispatch: React.Dispatch<EventAction>;
}

export const EventContext = createContext<EventContextValue | null>(null);

interface EventProviderProps {
  children: ReactNode;
}

export function EventProvider({ children }: EventProviderProps) {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  useEffect(() => {
    let cancelled = false;

    async function loadEvents() {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const events = await fetchEvents();

        if (!cancelled) {
          dispatch({ type: 'SET_EVENTS', payload: events });
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Error desconocido';
          dispatch({ type: 'SET_ERROR', payload: message });
        }
      }
    }

    loadEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  return <EventContext.Provider value={{ state, dispatch }}>{children}</EventContext.Provider>;
}
