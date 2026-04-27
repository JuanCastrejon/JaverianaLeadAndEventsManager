import { describe, it, expect } from 'vitest';
import { normalizeLeadData } from '../utils/normalizers';

describe('normalizeLeadData', () => {
  it('capitaliza nombre y apellido', () => {
    const result = normalizeLeadData({
      first_name: 'carlos',
      last_name: 'rodríguez',
      email: 'test@email.com',
      phone: '',
      program_id: 'uuid-1',
    });
    expect(result.first_name).toBe('Carlos');
    expect(result.last_name).toBe('Rodríguez');
  });

  it('convierte email a lowercase y trimea', () => {
    const result = normalizeLeadData({
      first_name: 'Ana',
      last_name: 'Pérez',
      email: '  ANA@Javeriana.Edu.Co  ',
      phone: '',
      program_id: 'uuid-1',
    });
    expect(result.email).toBe('ana@javeriana.edu.co');
  });

  it('trimea espacios en nombre y apellido', () => {
    const result = normalizeLeadData({
      first_name: '  carlos  ',
      last_name: '  pérez  ',
      email: 'a@b.com',
      phone: '',
      program_id: 'uuid-1',
    });
    expect(result.first_name).toBe('Carlos');
    expect(result.last_name).toBe('Pérez');
  });

  it('normaliza espacios múltiples en teléfono', () => {
    const result = normalizeLeadData({
      first_name: 'Test',
      last_name: 'User',
      email: 'a@b.com',
      phone: '+57  300   123  4567',
      program_id: 'uuid-1',
    });
    expect(result.phone).toBe('+57 300 123 4567');
  });

  it('maneja teléfono vacío', () => {
    const result = normalizeLeadData({
      first_name: 'Test',
      last_name: 'User',
      email: 'a@b.com',
      phone: '',
      program_id: 'uuid-1',
    });
    expect(result.phone).toBe('');
  });

  it('capitaliza nombres compuestos', () => {
    const result = normalizeLeadData({
      first_name: 'juan carlos',
      last_name: 'de la cruz',
      email: 'a@b.com',
      phone: '',
      program_id: 'uuid-1',
    });
    expect(result.first_name).toBe('Juan Carlos');
    expect(result.last_name).toBe('De La Cruz');
  });

  it('preserva program_id sin cambios', () => {
    const id = 'uuid-especial-123';
    const result = normalizeLeadData({
      first_name: 'Test',
      last_name: 'User',
      email: 'a@b.com',
      phone: '',
      program_id: id,
    });
    expect(result.program_id).toBe(id);
  });
});
