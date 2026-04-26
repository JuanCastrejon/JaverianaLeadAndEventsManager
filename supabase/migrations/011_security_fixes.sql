-- Migración: Correcciones de seguridad del linter de Supabase y revisión Copilot AI (PR #5)
-- Proyecto: Javeriana Lead & Events Manager

SET client_encoding TO 'UTF8';

-- ═══════════════════════════════════════════════════════════════════
-- FIX 1: Eliminar SELECT público en leads (expone PII a anon)
-- Ref: Copilot AI #4, #8 — anon_select_leads permite leer PII
-- ═══════════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "anon_select_leads" ON leads;
DROP POLICY IF EXISTS "Leads can be read after insert" ON leads;

-- SELECT solo para usuarios autenticados (futuro panel admin)
CREATE POLICY "authenticated_select_leads" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- ═══════════════════════════════════════════════════════════════════
-- FIX 2: Recrear leads_admin_view como SECURITY INVOKER
-- Ref: Supabase Linter — security_definer_view (ERROR)
-- SECURITY INVOKER respeta los permisos y RLS del usuario que consulta
-- ═══════════════════════════════════════════════════════════════════
DROP VIEW IF EXISTS leads_admin_view;

CREATE VIEW leads_admin_view
  WITH (security_invoker = true)
AS
SELECT
  l.id,
  l.created_at,
  p.name AS program_name,
  CONCAT(LEFT(l.first_name, 1), '***') AS first_name_masked,
  CONCAT(LEFT(l.last_name, 1), '***') AS last_name_masked,
  REGEXP_REPLACE(l.email, '(^.).*(@.*$)', '\1***\2') AS email_masked,
  CASE
    WHEN l.phone IS NULL OR l.phone = '' THEN NULL
    ELSE CONCAT('***', RIGHT(l.phone, 2))
  END AS phone_masked
FROM leads l
JOIN programs p ON p.id = l.program_id
ORDER BY l.created_at DESC;

-- Solo authenticated puede consultar la vista (no anon)
GRANT SELECT ON leads_admin_view TO authenticated;

-- ═══════════════════════════════════════════════════════════════════
-- FIX 3: Fijar search_path en set_updated_at()
-- Ref: Supabase Linter — function_search_path_mutable (WARN)
-- ═══════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ═══════════════════════════════════════════════════════════════════
-- FIX 4: Restringir INSERT de leads con validación mínima
-- Ref: Supabase Linter — rls_policy_always_true (WARN)
-- En lugar de WITH CHECK (true), validar campos obligatorios
-- ═══════════════════════════════════════════════════════════════════
DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;

CREATE POLICY "anon_insert_leads_validated" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (
    -- Campos obligatorios no vacíos
    first_name IS NOT NULL AND TRIM(first_name) <> '' AND
    last_name IS NOT NULL AND TRIM(last_name) <> '' AND
    email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND
    program_id IS NOT NULL
  );

-- ═══════════════════════════════════════════════════════════════════
-- FIX 5: Agregar policy SELECT pública para tabla events
-- Ref: Supabase Linter — rls_enabled_no_policy (INFO)
-- Eventos son información pública institucional
-- ═══════════════════════════════════════════════════════════════════
CREATE POLICY "events_public_read" ON events
  FOR SELECT
  TO anon, authenticated
  USING (true);
