export interface EventItem {
  id: string;
  name: string;
  description: string;
  category: EventCategory;
  source: EventSource;
  event_code: string | null;
  organizer: string | null;
  location: string | null;
  start_date: string;
  end_date: string | null;
  registration_end_date: string | null;
  url: string | null;
  image_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export type EventCategory =
  | 'Académico'
  | 'Pastoral'
  | 'Cultural'
  | 'Bienestar'
  | 'Institucional';

export type EventSource = 'Hoy en la Javeriana' | 'Medio Universitario';
