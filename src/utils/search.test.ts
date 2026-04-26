import { describe, it, expect } from 'vitest';

/**
 * Re-exportamos la función para testearla aislada.
 * En producción vive dentro de ProgramContext.tsx como función privada.
 */
function stripDiacritics(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function filterPrograms(
  programs: Array<{ name: string; description: string; faculty: string; category: string }>,
  searchQuery: string,
  selectedCategory: string,
) {
  const normalizedQuery = stripDiacritics(searchQuery);
  return programs.filter((program) => {
    const matchesSearch =
      !normalizedQuery ||
      stripDiacritics(program.name).includes(normalizedQuery) ||
      stripDiacritics(program.description).includes(normalizedQuery) ||
      stripDiacritics(program.faculty).includes(normalizedQuery);
    const matchesCategory = !selectedCategory || program.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
}

const mockPrograms = [
  { name: 'Ingeniería de Sistemas', description: 'Formación en desarrollo de software', faculty: 'Facultad de Ingeniería', category: 'Pregrado' },
  { name: 'Administración de Empresas', description: 'Gestión estratégica', faculty: 'Facultad de Ciencias Económicas', category: 'Pregrado' },
  { name: 'Maestría en Educación', description: 'Pedagogía avanzada', faculty: 'Facultad de Educación', category: 'Posgrado' },
  { name: 'Doctorado en Ingeniería', description: 'Investigación avanzada', faculty: 'Facultad de Ingeniería', category: 'Posgrado' },
];

describe('stripDiacritics', () => {
  it('elimina tildes', () => {
    expect(stripDiacritics('Ingeniería')).toBe('ingenieria');
    expect(stripDiacritics('Educación')).toBe('educacion');
    expect(stripDiacritics('Administración')).toBe('administracion');
  });

  it('convierte a minúsculas', () => {
    expect(stripDiacritics('HOLA MUNDO')).toBe('hola mundo');
  });

  it('maneja strings sin diacríticos', () => {
    expect(stripDiacritics('software')).toBe('software');
  });

  it('maneja diéresis (ü)', () => {
    expect(stripDiacritics('pingüino')).toBe('pinguino');
  });

  it('maneja string vacío', () => {
    expect(stripDiacritics('')).toBe('');
  });
});

describe('filterPrograms — búsqueda por proximidad', () => {
  it('encuentra "ingenieria" sin tilde', () => {
    const results = filterPrograms(mockPrograms, 'ingenieria', '');
    expect(results).toHaveLength(2);
    expect(results[0].name).toContain('Ingeniería');
  });

  it('encuentra "Ingeniería" con tilde', () => {
    const results = filterPrograms(mockPrograms, 'Ingeniería', '');
    expect(results).toHaveLength(2);
  });

  it('encuentra por facultad sin tildes', () => {
    const results = filterPrograms(mockPrograms, 'economicas', '');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Administración de Empresas');
  });

  it('encuentra por descripción parcial', () => {
    const results = filterPrograms(mockPrograms, 'pedagogia', '');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Maestría en Educación');
  });

  it('filtra por categoría', () => {
    const results = filterPrograms(mockPrograms, '', 'Posgrado');
    expect(results).toHaveLength(2);
  });

  it('combina búsqueda + categoría', () => {
    const results = filterPrograms(mockPrograms, 'ingenieria', 'Posgrado');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Doctorado en Ingeniería');
  });

  it('retorna vacío sin coincidencias', () => {
    const results = filterPrograms(mockPrograms, 'xyz123', '');
    expect(results).toHaveLength(0);
  });

  it('retorna todos con query vacía', () => {
    const results = filterPrograms(mockPrograms, '', '');
    expect(results).toHaveLength(4);
  });

  it('es case-insensitive', () => {
    const results = filterPrograms(mockPrograms, 'MAESTRIA', '');
    expect(results).toHaveLength(1);
  });
});
