import type { Lead, LeadFormData } from '../types';
import { STORAGE_KEYS } from '../utils/constants';

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
