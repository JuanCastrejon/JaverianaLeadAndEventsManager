# SQL Database — Convenciones para Supabase PostgreSQL

## Tablas

- Nombres en snake_case en español: `programas_academicos`, `leads`
- PK: UUID con `gen_random_uuid()`
- Timestamps obligatorios: `created_at TIMESTAMPTZ DEFAULT NOW()`, `updated_at TIMESTAMPTZ DEFAULT NOW()`
- CHECK constraints para valores enumerados

## Row Level Security (RLS)

- Siempre habilitar RLS en todas las tablas
- Políticas explícitas por operación (SELECT, INSERT, UPDATE, DELETE)
- Nunca exponer datos sensibles (PII) con SELECT público
- Datos de lectura pública: solo tablas de catálogo/referencia

## Migraciones

- Carpeta `supabase/migrations/` con archivos numerados
- Formato: `001_create_programs.sql`, `002_create_leads.sql`
- Seed data en migración separada: `003_seed_programs.sql`
- Aplicar con: `supabase db push`

## Tipos TypeScript

- Generar desde esquema: `supabase gen types typescript --project-id <id> --schema public > src/types/database.ts`
- Nunca escribir tipos de DB a mano si se puede generar

## Encoding

- En Windows con PowerShell, todo script SQL con texto español debe usar UTF-8
- Verificar que los seeds con tildes y ñ se guardan correctamente
