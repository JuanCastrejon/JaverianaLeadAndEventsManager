import type { Program } from './program';
import type { EventItem } from './event';
import type { Lead } from './lead';

/* ── Program State ── */
export interface ProgramState {
  programs: Program[];
  filteredPrograms: Program[];
  searchQuery: string;
  selectedCategory: string;
  loading: boolean;
  error: string | null;
}

export type ProgramAction =
  | { type: 'SET_PROGRAMS'; payload: Program[] }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'APPLY_FILTERS' };

/* ── Event State ── */
export interface EventState {
  events: EventItem[];
  loading: boolean;
  error: string | null;
}

export type EventAction =
  | { type: 'SET_EVENTS'; payload: EventItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

/* ── Lead State ── */
export interface LeadState {
  leads: Lead[];
  loading: boolean;
  error: string | null;
}

export type LeadAction =
  | { type: 'SET_LEADS'; payload: Lead[] }
  | { type: 'ADD_LEAD'; payload: Lead }
  | { type: 'DELETE_LEAD'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

/* ── Theme State ── */
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeState {
  mode: ThemeMode;
  resolved: 'light' | 'dark';
}

export type ThemeAction =
  | { type: 'SET_MODE'; payload: ThemeMode }
  | { type: 'SET_RESOLVED'; payload: 'light' | 'dark' };
