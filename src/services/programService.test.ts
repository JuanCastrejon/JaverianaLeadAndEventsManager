import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Program } from '../types';
import { STORAGE_KEYS } from '../utils/constants';

vi.spyOn(console, 'warn').mockImplementation(() => undefined);

const { mockOrder, mockSelect, mockFrom, mockSupabase } = vi.hoisted(() => {
  const order = vi.fn();
  const select = vi.fn(() => ({ order }));
  const from = vi.fn(() => ({ select }));

  return {
    mockOrder: order,
    mockSelect: select,
    mockFrom: from,
    mockSupabase: { from },
  };
});

vi.mock('../lib/supabase', () => ({
  supabase: mockSupabase,
}));

import { fetchPrograms } from './programService';

const SAMPLE_PROGRAMS: Program[] = [
  {
    id: 'program-1',
    name: 'Ingeniería de Sistemas',
    description: 'Programa de formación en ingeniería de software.',
    category: 'Pregrado',
    faculty: 'Facultad de Ingeniería',
    duration: '10 semestres',
    modality: 'Presencial',
    credits: 160,
    image_url: null,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
];

describe('fetchPrograms', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('guarda en cache cuando la consulta remota es exitosa', async () => {
    mockOrder.mockResolvedValueOnce({ data: SAMPLE_PROGRAMS, error: null });

    const result = await fetchPrograms();

    expect(result).toEqual(SAMPLE_PROGRAMS);
    expect(mockFrom).toHaveBeenCalledWith('programs');
    expect(mockSelect).toHaveBeenCalledWith('*');

    const cached = localStorage.getItem(STORAGE_KEYS.PROGRAMS_CACHE);
    expect(cached).not.toBeNull();
    expect(JSON.parse(cached ?? '[]')).toEqual(SAMPLE_PROGRAMS);
  });

  it('usa cache local cuando la consulta remota falla', async () => {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS_CACHE, JSON.stringify(SAMPLE_PROGRAMS));
    mockOrder.mockResolvedValueOnce({ data: null, error: { message: 'forbidden' } });

    const result = await fetchPrograms();

    expect(result).toEqual(SAMPLE_PROGRAMS);
  });

  it('lanza error cuando falla remoto y no existe cache', async () => {
    mockOrder.mockResolvedValueOnce({ data: null, error: { message: 'forbidden' } });

    await expect(fetchPrograms()).rejects.toThrow('Error al cargar programas: forbidden');
  });
});
