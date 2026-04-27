import { describe, it, expect } from 'vitest';
import { validateLeadForm, validateEmail, validatePhone } from '../utils/validators';

describe('validateEmail', () => {
  it('acepta emails válidos', () => {
    expect(validateEmail('user@javeriana.edu.co')).toBe(true);
    expect(validateEmail('admin@gmail.com')).toBe(true);
    expect(validateEmail('test.user+tag@domain.org')).toBe(true);
  });

  it('rechaza emails inválidos', () => {
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('no-arroba')).toBe(false);
    expect(validateEmail('@sinlocal.com')).toBe(false);
    expect(validateEmail('espacios en@email.com')).toBe(false);
  });
});

describe('validatePhone', () => {
  it('acepta teléfonos válidos o vacíos', () => {
    expect(validatePhone('')).toBe(true);
    expect(validatePhone('+57 300 1234567')).toBe(true);
    expect(validatePhone('3001234567')).toBe(true);
    expect(validatePhone('(601) 320-8320')).toBe(true);
  });

  it('rechaza teléfonos inválidos', () => {
    expect(validatePhone('abc')).toBe(false);
    expect(validatePhone('12')).toBe(false);
  });
});

describe('validateLeadForm', () => {
  const validForm = {
    first_name: 'Carlos',
    last_name: 'Rodríguez',
    email: 'carlos@javeriana.edu.co',
    phone: '',
    program_id: 'uuid-programa-1',
  };

  it('retorna valid=true con datos correctos', () => {
    const result = validateLeadForm(validForm);
    expect(result.valid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it('valida nombre obligatorio', () => {
    const result = validateLeadForm({ ...validForm, first_name: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.first_name).toBeDefined();
  });

  it('valida nombre mínimo 2 caracteres', () => {
    const result = validateLeadForm({ ...validForm, first_name: 'A' });
    expect(result.valid).toBe(false);
    expect(result.errors.first_name).toContain('2 caracteres');
  });

  it('valida apellido obligatorio', () => {
    const result = validateLeadForm({ ...validForm, last_name: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.last_name).toBeDefined();
  });

  it('valida email obligatorio', () => {
    const result = validateLeadForm({ ...validForm, email: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  it('valida formato de email', () => {
    const result = validateLeadForm({ ...validForm, email: 'invalido' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toContain('válido');
  });

  it('valida programa obligatorio', () => {
    const result = validateLeadForm({ ...validForm, program_id: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.program_id).toBeDefined();
  });

  it('permite teléfono vacío (opcional)', () => {
    const result = validateLeadForm({ ...validForm, phone: '' });
    expect(result.valid).toBe(true);
  });

  it('valida formato de teléfono si se proporciona', () => {
    const result = validateLeadForm({ ...validForm, phone: 'abc' });
    expect(result.valid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  it('acumula múltiples errores', () => {
    const result = validateLeadForm({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      program_id: '',
    });
    expect(result.valid).toBe(false);
    expect(Object.keys(result.errors).length).toBeGreaterThanOrEqual(4);
  });
});
