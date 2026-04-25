import type { LeadFormData, ValidationResult } from '../types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{7,15}$/;

export function validateLeadForm(data: LeadFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.first_name.trim()) {
    errors.first_name = 'El nombre es obligatorio';
  } else if (data.first_name.trim().length < 2) {
    errors.first_name = 'El nombre debe tener al menos 2 caracteres';
  }

  if (!data.last_name.trim()) {
    errors.last_name = 'El apellido es obligatorio';
  } else if (data.last_name.trim().length < 2) {
    errors.last_name = 'El apellido debe tener al menos 2 caracteres';
  }

  if (!data.email.trim()) {
    errors.email = 'El correo electrónico es obligatorio';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'El correo electrónico no es válido';
  }

  if (data.phone && !PHONE_REGEX.test(data.phone)) {
    errors.phone = 'El número de teléfono no es válido';
  }

  if (!data.program_id) {
    errors.program_id = 'Debe seleccionar un programa académico';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function validatePhone(phone: string): boolean {
  return !phone || PHONE_REGEX.test(phone);
}
