import { supabase } from '../lib/supabase';
import type { Lead, LeadFormData } from '../types';
import { API_CONFIG, STORAGE_KEYS } from '../utils/constants';

/* ── localStorage (persistencia obligatoria P0) ── */

export function getLeadsFromStorage(): Lead[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LEADS);
    if (!stored) return [];
    return JSON.parse(stored) as Lead[];
  } catch {
    console.warn('[LeadService] Error al leer leads de localStorage');
    return [];
  }
}

export function saveLeadsToStorage(leads: Lead[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  } catch {
    console.warn('[LeadService] Error al guardar leads en localStorage');
  }
}

export function createLead(formData: LeadFormData): Lead {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    ...formData,
    created_at: now,
    updated_at: now,
  };
}

export function addLeadToStorage(lead: Lead): Lead[] {
  const leads = getLeadsFromStorage();
  const updated = [lead, ...leads];
  saveLeadsToStorage(updated);
  return updated;
}

export function deleteLeadFromStorage(id: string): Lead[] {
  const leads = getLeadsFromStorage();
  const updated = leads.filter((lead) => lead.id !== id);
  saveLeadsToStorage(updated);
  return updated;
}

/* ── Supabase (persistencia remota P1) ── */

export async function insertLeadRemote(formData: LeadFormData): Promise<boolean> {
  if (!supabase) {
    console.warn('[LeadService] Supabase no disponible, lead solo persistido localmente');
    return false;
  }

  const { error } = await supabase
    .from(API_CONFIG.LEADS_TABLE)
    .insert({
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone || null,
      program_id: formData.program_id,
    });

  if (error) {
    console.error('[LeadService] Error al insertar lead en Supabase:', error.message);
    return false;
  }

  return true;
}

export async function fetchLeadsRemote(): Promise<Lead[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from(API_CONFIG.LEADS_TABLE)
    .select('*, programs(name)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[LeadService] Error al cargar leads remotos:', error.message);
    return [];
  }

  return (data ?? []) as Lead[];
}
