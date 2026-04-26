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

/**
 * fetchLeadsRemote() — ELIMINADA intencionalmente.
 *
 * La tabla leads NO tiene policy SELECT para anon (protección de PII).
 * La lectura remota solo es posible con rol authenticated (futuro panel admin)
 * o via la vista anonimizada leads_admin_view.
 *
 * El frontend usa exclusivamente localStorage para la vista de leads.
 */
