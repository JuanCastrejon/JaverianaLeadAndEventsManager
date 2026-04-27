import { supabase } from '../lib/supabase';
import type { EventItem } from '../types/event';
import { API_CONFIG, STORAGE_KEYS } from '../utils/constants';

const RETRY_DELAYS_MS = [300, 900] as const;

/**
 * Obtiene eventos en cache de localStorage.
 * Retorna array vacío si no hay cache o si está corrupto.
 */
export function getCachedEvents(): EventItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EVENTS_CACHE);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Validación básica de schema
    const validEvents = parsed.filter((item) => {
      return (
        item
        && typeof item === 'object'
        && 'id' in item
        && 'name' in item
      );
    });

    return validEvents as EventItem[];
  } catch (err) {
    console.warn('[eventService] Cache corrupto, ignorando:', err);
    return [];
  }
}

function saveCachedEvents(events: EventItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.EVENTS_CACHE, JSON.stringify(events));
  } catch {
    // Ignorar fallos de cache local para no bloquear la carga remota.
  }
}

function isRetryableMessage(message: string): boolean {
  const normalized = message.toLowerCase();
  return (
    normalized.includes('failed to fetch')
    || normalized.includes('network')
    || normalized.includes('timeout')
    || normalized.includes('429')
    || normalized.includes('502')
    || normalized.includes('503')
    || normalized.includes('504')
  );
}

function wait(delayMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });
}

export async function fetchEvents(): Promise<EventItem[]> {
  const cachedEvents = getCachedEvents();

  if (!supabase) {
    if (cachedEvents.length > 0) {
      console.warn('[EventService] Supabase no disponible, usando cache local de eventos');
      return cachedEvents;
    }

    console.warn('[EventService] Supabase no disponible, retornando datos vacios');
    return [];
  }

  let lastErrorMessage = 'Error desconocido al cargar eventos';

  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt += 1) {
    const { data, error } = await supabase
      .from(API_CONFIG.EVENTS_TABLE)
      .select('*')
      .order('start_date', { ascending: true });

    if (!error) {
      const events = data ?? [];
      if (events.length > 0) {
        saveCachedEvents(events);
      }
      return events;
    }

    lastErrorMessage = error.message;

    const shouldRetry = isRetryableMessage(error.message) && attempt < RETRY_DELAYS_MS.length;
    if (shouldRetry) {
      await wait(RETRY_DELAYS_MS[attempt]);
      continue;
    }

    break;
  }

  if (cachedEvents.length > 0) {
    console.warn('[EventService] Error remoto, usando cache local de eventos:', lastErrorMessage);
    return cachedEvents;
  }

  throw new Error(`Error al cargar eventos: ${lastErrorMessage}`);
}
