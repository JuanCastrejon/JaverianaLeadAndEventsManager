-- Migración: Vista administrativa segura de leads
-- Proyecto: Javeriana Lead & Events Manager

SET client_encoding TO 'UTF8';

CREATE OR REPLACE VIEW leads_admin_view AS
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

GRANT SELECT ON leads_admin_view TO authenticated;
