import type { LeadFormData } from '../types';

export function normalizeLeadData(data: LeadFormData): LeadFormData {
  return {
    first_name: capitalizeWords(data.first_name.trim()),
    last_name: capitalizeWords(data.last_name.trim()),
    email: data.email.trim().toLowerCase(),
    phone: normalizePhone(data.phone),
    program_id: data.program_id,
  };
}

function capitalizeWords(text: string): string {
  return text
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
}

function normalizePhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/\s+/g, ' ').trim();
}
