import { useContext, useCallback } from 'react';
import { LeadContext } from '../context/LeadContext';
import type { LeadFormData } from '../types';
import { createLead, insertLeadRemote } from '../services/leadService';
import { normalizeLeadData } from '../utils/normalizers';
import { validateLeadForm } from '../utils/validators';

export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads debe usarse dentro de un LeadProvider');
  }

  const { state, addLead, deleteLead } = context;

  const submitLead = useCallback(
    async (formData: LeadFormData) => {
      const normalized = normalizeLeadData(formData);
      const validation = validateLeadForm(normalized);

      if (!validation.valid) {
        return { success: false as const, errors: validation.errors };
      }

      // 1. Crear lead local (genera UUID + timestamps)
      const lead = createLead(normalized);

      // 2. Persistir en localStorage (inmediato, P0)
      addLead(lead);

      // 3. Insertar en Supabase (fire-and-forget, P1)
      insertLeadRemote(normalized).catch(() => {
        // No bloquear la UX — el lead ya está en localStorage
      });

      return { success: true as const, lead };
    },
    [addLead],
  );

  return {
    leads: state.leads,
    loading: state.loading,
    error: state.error,
    submitLead,
    deleteLead,
    totalLeads: state.leads.length,
  };
}
