-- Migración: Crear tabla de leads (prospectos)
-- Proyecto: Javeriana Lead & Events Manager

CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  program_id UUID NOT NULL REFERENCES programs(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Solo INSERT público (formulario de registro)
-- NO hay SELECT público para proteger PII
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert leads" ON leads FOR INSERT WITH CHECK (true);
-- Lectura solo vía service_role (backend admin)

-- Índices
CREATE INDEX idx_leads_program_id ON leads(program_id);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
