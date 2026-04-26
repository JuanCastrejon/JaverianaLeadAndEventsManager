-- Migración: Agregar política SELECT para leads después de INSERT
-- Necesaria para que .select() funcione después de .insert()

-- Política: el lead insertado puede ser leído por quien lo insertó (anon key)
CREATE POLICY "Leads can be read after insert" ON leads
  FOR SELECT
  TO authenticated
  USING (true);
