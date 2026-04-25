import {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { ThemeState, ThemeAction, ThemeMode } from '../types';
import { STORAGE_KEYS } from '../utils/constants';

function getStoredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // noop
  }
  return 'system';
}

function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return mode;
}

const initialMode = getStoredTheme();
const initialState: ThemeState = {
  mode: initialMode,
  resolved: resolveTheme(initialMode),
};

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload,
        resolved: resolveTheme(action.payload),
      };
    case 'SET_RESOLVED':
      return { ...state, resolved: action.payload };
    default:
      return state;
  }
}

interface ThemeContextValue {
  state: ThemeState;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    dispatch({ type: 'SET_MODE', payload: mode });
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, mode);
    } catch {
      // noop
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const next = state.resolved === 'light' ? 'dark' : 'light';
    setThemeMode(next);
  }, [state.resolved, setThemeMode]);

  // Aplicar clase dark al <html>
  useEffect(() => {
    const root = document.documentElement;
    if (state.resolved === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.resolved]);

  // Escuchar cambios del sistema operativo
  useEffect(() => {
    if (state.mode !== 'system') return;

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      dispatch({ type: 'SET_RESOLVED', payload: e.matches ? 'dark' : 'light' });
    };

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [state.mode]);

  return (
    <ThemeContext.Provider value={{ state, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
