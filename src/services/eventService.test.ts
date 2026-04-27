import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { EventItem } from '../types/event';
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

import { fetchEvents } from './eventService';

const SAMPLE_EVENTS: EventItem[] = [
  {
    id: 'event-1',
    name: 'Expojaveriana Posgrados',
    description: 'Evento informativo sobre programas de posgrado.',
    category: 'Académico',
    source: 'Hoy en la Javeriana',
    event_code: null,
    organizer: 'Mercadeo',
    location: 'Campus Bogota',
    start_date: '2026-04-15T09:00:00.000Z',
    end_date: null,
    registration_end_date: null,
    url: 'https://www.javeriana.edu.co/hoy-en-la-javeriana/eventos',
    image_url: null,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  },
];

describe('fetchEvents', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('guarda en cache cuando la consulta remota es exitosa', async () => {
    mockOrder.mockResolvedValueOnce({ data: SAMPLE_EVENTS, error: null });

    const result = await fetchEvents();

    expect(result).toEqual(SAMPLE_EVENTS);
    expect(mockFrom).toHaveBeenCalledWith('javeriana_events');
    expect(mockSelect).toHaveBeenCalledWith('*');

    const cached = localStorage.getItem(STORAGE_KEYS.EVENTS_CACHE);
    expect(cached).not.toBeNull();
    expect(JSON.parse(cached ?? '[]')).toEqual(SAMPLE_EVENTS);
  });

  it('usa cache local cuando la consulta remota falla', async () => {
    localStorage.setItem(STORAGE_KEYS.EVENTS_CACHE, JSON.stringify(SAMPLE_EVENTS));
    mockOrder.mockResolvedValueOnce({ data: null, error: { message: 'forbidden' } });

    const result = await fetchEvents();

    expect(result).toEqual(SAMPLE_EVENTS);
  });

  it('lanza error cuando falla remoto y no existe cache', async () => {
    mockOrder.mockResolvedValueOnce({ data: null, error: { message: 'forbidden' } });

    await expect(fetchEvents()).rejects.toThrow('Error al cargar eventos: forbidden');
  });
});
