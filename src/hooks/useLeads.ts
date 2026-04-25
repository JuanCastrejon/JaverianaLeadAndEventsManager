import { useContext } from 'react';
import { LeadContext } from '../context/LeadContext';
import type { LeadFormData } from '../types';
import { createLead } from '../services/leadService';
import { normalizeLeadData } from '../utils/normalizers';
import { validateLeadForm } from '../utils/validators';

export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads debe usarse dentro de un LeadProvider');
  }

  const { state, addLead, deleteLead } = context;

  function submitLead(formData: LeadFormData) {
    const normalized = normalizeLeadData(formData);
    const validation = validateLeadForm(normalized);

    if (!validation.valid) {
      return { success: false as const, errors: validation.errors };
    }

    const lead = createLead(normalized);
    addLead(lead);

    return { success: true as const, lead };
  }

  return {
    leads: state.leads,
    loading: state.loading,
    error: state.error,
    submitLead,
    deleteLead,
    totalLeads: state.leads.length,
  };
}
