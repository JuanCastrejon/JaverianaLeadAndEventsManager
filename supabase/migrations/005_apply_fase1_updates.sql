-- Migración incremental: aplicar ajustes de Fase 1 en proyecto ya migrado
-- Proyecto: Javeriana Lead & Events Manager

SET client_encoding TO 'UTF8';

-- Asegurar extensión para UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Función compartida para mantener updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger en programs solo si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'trg_programs_updated_at'
  ) THEN
    CREATE TRIGGER trg_programs_updated_at
    BEFORE UPDATE ON programs
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END;
$$;

-- Crear trigger en leads solo si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'trg_leads_updated_at'
  ) THEN
    CREATE TRIGGER trg_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  END IF;
END;
$$;

-- Completar seed adicional (idempotente por nombre)
INSERT INTO programs (name, description, category, faculty, duration, modality, credits, image_url)
SELECT *
FROM (
  VALUES
    ('Ingeniería Industrial', 'Formación en optimización de procesos, logística, analítica y gestión de operaciones para entornos competitivos.', 'Pregrado', 'Facultad de Ingeniería', '10 semestres', 'Presencial', 168, NULL),
    ('Ingeniería Civil', 'Diseño y construcción de infraestructura sostenible con enfoque en desarrollo urbano y responsabilidad social.', 'Pregrado', 'Facultad de Ingeniería', '10 semestres', 'Presencial', 172, NULL),
    ('Enfermería', 'Programa orientado al cuidado integral de la salud con fundamento científico, ético y humanístico.', 'Pregrado', 'Facultad de Enfermería', '10 semestres', 'Presencial', 164, NULL),
    ('Contaduría Pública', 'Formación en información financiera, auditoría, tributación y control para la toma de decisiones organizacionales.', 'Pregrado', 'Facultad de Ciencias Económicas y Administrativas', '9 semestres', 'Presencial', 150, NULL),
    ('Ciencia Política', 'Análisis de fenómenos políticos, instituciones públicas y gobernanza con perspectiva nacional e internacional.', 'Pregrado', 'Facultad de Ciencias Políticas y Relaciones Internacionales', '8 semestres', 'Presencial', 140, NULL),
    ('Doctorado en Ingeniería', 'Investigación avanzada en ingeniería para generar conocimiento aplicado y soluciones de alto impacto.', 'Posgrado', 'Facultad de Ingeniería', '8 semestres', 'Presencial', 96, NULL),
    ('Doctorado en Ciencias Jurídicas', 'Formación investigativa en teoría del derecho, justicia y política pública con enfoque interdisciplinar.', 'Posgrado', 'Facultad de Ciencias Jurídicas', '8 semestres', 'Presencial', 92, NULL),
    ('Especialización en Analítica de Datos', 'Aplicación de analítica y visualización de datos para apoyar decisiones estratégicas en organizaciones.', 'Posgrado', 'Facultad de Ingeniería', '2 semestres', 'Híbrido', 26, NULL),
    ('Especialización en Finanzas', 'Profundización en evaluación financiera, mercados de capitales y gestión del riesgo corporativo.', 'Posgrado', 'Facultad de Ciencias Económicas y Administrativas', '2 semestres', 'Presencial', 28, NULL),
    ('Curso en Inteligencia Artificial Generativa', 'Programa corto para aplicar IA generativa en productividad, innovación y transformación digital.', 'Educación Continua', 'Facultad de Ingeniería', '60 horas', 'Virtual', NULL, NULL)
) AS v(name, description, category, faculty, duration, modality, credits, image_url)
WHERE NOT EXISTS (
  SELECT 1
  FROM programs p
  WHERE p.name = v.name
);
