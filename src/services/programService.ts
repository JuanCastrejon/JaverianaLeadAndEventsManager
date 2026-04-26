import { supabase } from '../lib/supabase';
import type { Program } from '../types';
import { API_CONFIG, STORAGE_KEYS } from '../utils/constants';

const RETRY_DELAYS_MS = [300, 900] as const;

function getCachedPrograms(): Program[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRAMS_CACHE);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed as Program[];
  } catch {
    return [];
  }
}

function saveCachedPrograms(programs: Program[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS_CACHE, JSON.stringify(programs));
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

export async function fetchPrograms(): Promise<Program[]> {
  const cachedPrograms = getCachedPrograms();

  if (!supabase) {
    if (cachedPrograms.length > 0) {
      console.warn('[ProgramService] Supabase no disponible, usando cache local de programas');
      return cachedPrograms;
    }

    console.warn('[ProgramService] Supabase no disponible, retornando datos vacíos');
    return [];
  }

  let lastErrorMessage = 'Error desconocido al cargar programas';

  for (let attempt = 0; attempt <= RETRY_DELAYS_MS.length; attempt += 1) {
    const { data, error } = await supabase
      .from(API_CONFIG.PROGRAMS_TABLE)
      .select('*')
      .order('name', { ascending: true });

    if (!error) {
      const programs = data ?? [];
      if (programs.length > 0) {
        saveCachedPrograms(programs);
      }
      return programs;
    }

    lastErrorMessage = error.message;

    const shouldRetry = isRetryableMessage(error.message) && attempt < RETRY_DELAYS_MS.length;
    if (shouldRetry) {
      await wait(RETRY_DELAYS_MS[attempt]);
      continue;
    }

    break;
  }

  if (cachedPrograms.length > 0) {
    console.warn('[ProgramService] Error remoto, usando cache local de programas:', lastErrorMessage);
    return cachedPrograms;
  }

  throw new Error(`Error al cargar programas: ${lastErrorMessage}`);
}

export async function fetchProgramById(id: string): Promise<Program | null> {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from(API_CONFIG.PROGRAMS_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Error al cargar programa: ${error.message}`);
  }

  return data;
}
