import { supabase } from '../lib/supabase';
import type { Program } from '../types';
import { API_CONFIG } from '../utils/constants';

export async function fetchPrograms(): Promise<Program[]> {
  if (!supabase) {
    console.warn('[ProgramService] Supabase no disponible, retornando datos vacíos');
    return [];
  }

  const { data, error } = await supabase
    .from(API_CONFIG.PROGRAMS_TABLE)
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(`Error al cargar programas: ${error.message}`);
  }

  return data ?? [];
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
