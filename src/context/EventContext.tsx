import { createContext, useCallback, useEffect, useReducer, useRef, type ReactNode } from 'react';
import type { EventAction, EventState } from '../types';
import { fetchEvents, getCachedEvents } from '../services/eventService';

/**
 * Inicializa el estado con datos en cache si están disponibles.
 * Esto evita que la sección aparezca en blanco mientras se cargan datos remotos.
 */
function getInitialState(): EventState {
  const cachedEvents = getCachedEvents();
  const hasCachedData = cachedEvents.length > 0;

  return {
    events: cachedEvents,
    loading: !hasCachedData, // Solo mostrar skeleton si no hay cache
    error: null,
  };
}

const initialState: EventState = getInitialState();

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
  reloadEvents: () => Promise<void>;
}

export const EventContext = createContext<EventContextValue | null>(null);

interface EventProviderProps {
  children: ReactNode;
}

export function EventProvider({ children }: EventProviderProps) {
  const [state, dispatch] = useReducer(eventReducer, initialState);
  const lastRequestId = useRef(0);

  const reloadEvents = useCallback(async () => {
    const requestId = lastRequestId.current + 1;
    lastRequestId.current = requestId;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const events = await fetchEvents();

      if (lastRequestId.current === requestId) {
        dispatch({ type: 'SET_EVENTS', payload: events });
      }
    } catch (err) {
      if (lastRequestId.current !== requestId) {
        return;
      }

      const message = err instanceof Error ? err.message : 'Error desconocido';
      dispatch({ type: 'SET_ERROR', payload: message });
    }
  }, []);

  useEffect(() => {
    void reloadEvents();
  }, [reloadEvents]);

  return <EventContext.Provider value={{ state, dispatch, reloadEvents }}>{children}</EventContext.Provider>;
}
