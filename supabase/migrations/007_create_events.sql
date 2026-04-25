-- Migración: Crear tabla de eventos
-- Proyecto: Javeriana Lead & Events Manager

SET client_encoding TO 'UTF8';

CREATE TABLE IF NOT EXISTS javeriana_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Académico', 'Pastoral', 'Cultural', 'Bienestar', 'Institucional')),
  source TEXT NOT NULL CHECK (source IN ('Hoy en la Javeriana', 'Medio Universitario')),
  event_code TEXT UNIQUE,
  organizer TEXT,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  registration_end_date DATE,
  url TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE javeriana_events ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'javeriana_events'
      AND policyname = 'Javeriana events are publicly readable'
  ) THEN
    CREATE POLICY "Javeriana events are publicly readable" ON javeriana_events FOR SELECT USING (true);
  END IF;
END;
$$;

CREATE INDEX IF NOT EXISTS idx_javeriana_events_source_start_date ON javeriana_events(source, start_date DESC);
CREATE INDEX IF NOT EXISTS idx_javeriana_events_category ON javeriana_events(category);
CREATE INDEX IF NOT EXISTS idx_javeriana_events_name_search ON javeriana_events USING gin(to_tsvector('spanish', name));

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'trg_javeriana_events_updated_at'
  ) THEN
    CREATE TRIGGER trg_javeriana_events_updated_at
    BEFORE UPDATE ON javeriana_events
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END;
$$;
