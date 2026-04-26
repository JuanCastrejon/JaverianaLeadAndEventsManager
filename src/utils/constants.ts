export const STORAGE_KEYS = {
  LEADS: 'javeriana_leads',
  THEME: 'javeriana_theme',
  PROGRAMS_CACHE: 'javeriana_programs_cache',
} as const;

export const API_CONFIG = {
  DEBOUNCE_MS: 300,
  PROGRAMS_TABLE: 'programs',
  EVENTS_TABLE: 'javeriana_events',
  LEADS_TABLE: 'leads',
} as const;

export const SECTIONS = {
  HERO: 'hero',
  PROGRAMS: 'programs',
  EVENTS: 'events',
  LEAD_FORM: 'lead-form',
  LEADS: 'leads',
} as const;
