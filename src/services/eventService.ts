import { supabase } from '../lib/supabase';
import type { EventItem } from '../types/event';
import { API_CONFIG } from '../utils/constants';

export async function fetchEvents(): Promise<EventItem[]> {
  if (!supabase) {
    console.warn('[EventService] Supabase no disponible, retornando datos vacios');
    return [];
  }

  const { data, error } = await supabase
    .from(API_CONFIG.EVENTS_TABLE)
    .select('*')
    .order('start_date', { ascending: true });

  if (error) {
    throw new Error(`Error al cargar eventos: ${error.message}`);
  }

  return data ?? [];
}
