import { createContext, useCallback, useEffect, useReducer, useRef, type ReactNode } from 'react';
import type { ProgramState, ProgramAction, Program } from '../types';
import { fetchPrograms } from '../services/programService';

const initialState: ProgramState = {
  programs: [],
  filteredPrograms: [],
  searchQuery: '',
  selectedCategory: '',
  loading: true,
  error: null,
};

/**
 * Elimina diacríticos (tildes, diéresis) de un string para búsqueda por proximidad.
 * "Ingeniería" → "ingenieria", "Educación" → "educacion"
 */
function stripDiacritics(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function filterPrograms(
  programs: Program[],
  searchQuery: string,
  selectedCategory: string,
): Program[] {
  const normalizedQuery = stripDiacritics(searchQuery);

  return programs.filter((program) => {
    const matchesSearch =
      !normalizedQuery ||
      stripDiacritics(program.name).includes(normalizedQuery) ||
      stripDiacritics(program.description).includes(normalizedQuery) ||
      stripDiacritics(program.faculty).includes(normalizedQuery);

    const matchesCategory =
      !selectedCategory || program.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

function programReducer(
  state: ProgramState,
  action: ProgramAction,
): ProgramState {
  switch (action.type) {
    case 'SET_PROGRAMS': {
      const programs = action.payload;
      return {
        ...state,
        programs,
        filteredPrograms: filterPrograms(
          programs,
          state.searchQuery,
          state.selectedCategory,
        ),
        loading: false,
      };
    }
    case 'SET_SEARCH_QUERY': {
      const searchQuery = action.payload;
      if (state.searchQuery === searchQuery) {
        return state;
      }
      return {
        ...state,
        searchQuery,
        filteredPrograms: filterPrograms(
          state.programs,
          searchQuery,
          state.selectedCategory,
        ),
      };
    }
    case 'SET_CATEGORY': {
      const selectedCategory = action.payload;
      if (state.selectedCategory === selectedCategory) {
        return state;
      }
      return {
        ...state,
        selectedCategory,
        filteredPrograms: filterPrograms(
          state.programs,
          state.searchQuery,
          selectedCategory,
        ),
      };
    }
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'APPLY_FILTERS':
      return {
        ...state,
        filteredPrograms: filterPrograms(
          state.programs,
          state.searchQuery,
          state.selectedCategory,
        ),
      };
    default:
      return state;
  }
}

interface ProgramContextValue {
  state: ProgramState;
  dispatch: React.Dispatch<ProgramAction>;
  reloadPrograms: () => Promise<void>;
}

export const ProgramContext = createContext<ProgramContextValue | null>(null);

interface ProgramProviderProps {
  children: ReactNode;
}

export function ProgramProvider({ children }: ProgramProviderProps) {
  const [state, dispatch] = useReducer(programReducer, initialState);
  const lastRequestId = useRef(0);

  const reloadPrograms = useCallback(async () => {
    const requestId = lastRequestId.current + 1;
    lastRequestId.current = requestId;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const programs = await fetchPrograms();

      if (lastRequestId.current === requestId) {
        dispatch({ type: 'SET_PROGRAMS', payload: programs });
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
    void reloadPrograms();
  }, [reloadPrograms]);

  return (
    <ProgramContext.Provider value={{ state, dispatch, reloadPrograms }}>
      {children}
    </ProgramContext.Provider>
  );
}
