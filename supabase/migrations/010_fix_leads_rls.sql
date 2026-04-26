-- Migración: Recrear políticas RLS de leads para asegurar INSERT + SELECT con anon key
-- El error anterior puede deberse a conflictos de policies heredadas

-- Eliminar policies existentes si las hay
DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;
DROP POLICY IF EXISTS "Leads can be read after insert" ON leads;

-- Política INSERT: cualquier usuario anon puede registrar un lead
CREATE POLICY "anon_insert_leads" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política SELECT: restringida a usuarios autenticados
CREATE POLICY "auth_select_leads" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Política DELETE: solo authenticated (futuro)
-- CREATE POLICY "auth_delete_leads" ON leads FOR DELETE TO authenticated USING (true);
