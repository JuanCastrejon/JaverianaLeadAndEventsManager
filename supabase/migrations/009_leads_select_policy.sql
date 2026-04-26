-- Migración: Agregar política SELECT restringida para leads
-- Solo usuarios autenticados pueden consultar registros

-- Política SELECT restringida a rol authenticated
CREATE POLICY "Leads can be read after insert" ON leads
  FOR SELECT
  TO authenticated
  USING (true);
