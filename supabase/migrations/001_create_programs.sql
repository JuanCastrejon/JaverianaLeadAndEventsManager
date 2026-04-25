-- Migración: Crear tabla de programas académicos
-- Proyecto: Javeriana Lead & Events Manager

CREATE TABLE programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Pregrado', 'Posgrado', 'Educación Continua')),
  faculty TEXT NOT NULL,
  duration TEXT NOT NULL,
  modality TEXT NOT NULL CHECK (modality IN ('Presencial', 'Virtual', 'Híbrido')),
  credits INTEGER,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Programas son de lectura pública
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Programs are publicly readable" ON programs FOR SELECT USING (true);

-- Índices para filtrado
CREATE INDEX idx_programs_category ON programs(category);
CREATE INDEX idx_programs_name ON programs USING gin(to_tsvector('spanish', name));
