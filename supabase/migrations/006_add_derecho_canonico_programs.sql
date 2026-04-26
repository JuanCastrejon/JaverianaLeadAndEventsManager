-- Migración incremental: programas adicionales para cobertura de facultades
-- Proyecto: Javeriana Lead & Events Manager

SET client_encoding TO 'UTF8';

INSERT INTO programs (name, description, category, faculty, duration, modality, credits, image_url)
SELECT *
FROM (
  VALUES
    -- Facultad de Artes
    ('Artes Escénicas', 'Programa orientado a la creación, interpretación y producción escénica con enfoque interdisciplinario.', 'Pregrado', 'Facultad de Artes', '8 semestres', 'Presencial', 140, NULL),
    ('Estudios Musicales', 'Formación integral en interpretación, composición y teoría musical para escenarios académicos y profesionales.', 'Pregrado', 'Facultad de Artes', '8 semestres', 'Presencial', 140, NULL),
    ('Artes Visuales', 'Desarrollo de lenguajes visuales contemporáneos con fundamentos conceptuales, técnicos y críticos.', 'Pregrado', 'Facultad de Artes', '8 semestres', 'Presencial', 140, NULL),

    -- Facultad de Ciencias
    ('Bacteriología', 'Formación científica en diagnóstico, investigación y análisis microbiológico aplicado a la salud.', 'Pregrado', 'Facultad de Ciencias', '10 semestres', 'Presencial', 170, NULL),
    ('Biología', 'Programa orientado al estudio de los sistemas vivos, biodiversidad y procesos ecológicos.', 'Pregrado', 'Facultad de Ciencias', '8 semestres', 'Presencial', 144, NULL),
    ('Ciencia de Datos', 'Formación en analítica, estadística, programación y modelado de datos para la toma de decisiones.', 'Pregrado', 'Facultad de Ciencias', '8 semestres', 'Presencial', 144, NULL),
    ('Matemáticas', 'Programa enfocado en fundamentos matemáticos, modelación y pensamiento lógico para ciencia y tecnología.', 'Pregrado', 'Facultad de Ciencias', '8 semestres', 'Presencial', 144, NULL),
    ('Microbiología Industrial', 'Estudio y aplicación de procesos microbiológicos para sectores productivos e innovación biotecnológica.', 'Pregrado', 'Facultad de Ciencias', '8 semestres', 'Presencial', 144, NULL),
    ('Nutrición y Dietética', 'Formación para la evaluación nutricional, promoción de salud y diseño de intervenciones alimentarias.', 'Pregrado', 'Facultad de Ciencias', '10 semestres', 'Presencial', 160, NULL),
    ('Química Farmacéutica', 'Programa orientado al desarrollo, análisis y control de medicamentos con rigor científico.', 'Pregrado', 'Facultad de Ciencias', '10 semestres', 'Presencial', 170, NULL),

    -- Facultad de Ciencias Sociales
    ('Antropología', 'Formación en análisis sociocultural, investigación etnográfica y comprensión de dinámicas humanas.', 'Pregrado', 'Facultad de Ciencias Sociales', '8 semestres', 'Presencial', 140, NULL),
    ('Estudios Literarios', 'Programa orientado al análisis crítico de textos, tradiciones literarias y producción cultural.', 'Pregrado', 'Facultad de Ciencias Sociales', '8 semestres', 'Presencial', 140, NULL),
    ('Historia', 'Formación en investigación histórica, análisis de fuentes y comprensión de procesos sociales.', 'Pregrado', 'Facultad de Ciencias Sociales', '8 semestres', 'Presencial', 140, NULL),
    ('Sociología', 'Programa enfocado en análisis de estructuras sociales, desigualdad y transformación social.', 'Pregrado', 'Facultad de Ciencias Sociales', '8 semestres', 'Presencial', 140, NULL),

    -- Facultad de Educación
    ('Licenciatura en Ciencias Naturales y Educación Ambiental', 'Formación pedagógica y disciplinar para enseñar ciencias y educación ambiental en distintos niveles.', 'Pregrado', 'Facultad de Educación', '8 semestres', 'Presencial', 140, NULL),
    ('Licenciatura en Educación Física', 'Programa para la formación docente en actividad física, deporte y bienestar integral.', 'Pregrado', 'Facultad de Educación', '8 semestres', 'Presencial', 140, NULL),
    ('Licenciatura en Educación Infantil', 'Formación de docentes para primera infancia con enfoque integral, ético y pedagógico.', 'Pregrado', 'Facultad de Educación', '8 semestres', 'Presencial', 140, NULL),
    ('Licenciatura en Filosofía', 'Formación docente en pensamiento filosófico, argumentación y didáctica de las humanidades.', 'Pregrado', 'Facultad de Educación', '8 semestres', 'Presencial', 140, NULL),
    ('Licenciatura en Literatura y Lengua Castellana', 'Programa para la enseñanza de literatura y lengua con enfoque crítico y pedagógico.', 'Pregrado', 'Facultad de Educación', '8 semestres', 'Presencial', 140, NULL),

    -- Facultad de Estudios Ambientales y Rurales
    ('Ecología', 'Formación en análisis ecosistémico, sostenibilidad y gestión de problemáticas ambientales.', 'Pregrado', 'Facultad de Estudios Ambientales y Rurales', '8 semestres', 'Presencial', 140, NULL),

    -- Facultad de Filosofía
    ('Filosofía', 'Programa centrado en pensamiento crítico, historia de la filosofía y reflexión ética contemporánea.', 'Pregrado', 'Facultad de Filosofía', '8 semestres', 'Presencial', 140, NULL),

    -- Facultad de Odontología
    ('Odontología', 'Formación clínica y científica para la prevención, diagnóstico y tratamiento integral en salud oral.', 'Pregrado', 'Facultad de Odontología', '10 semestres', 'Presencial', 180, NULL),

    -- Facultad de Teología
    ('Teología', 'Programa orientado al estudio sistemático de la fe, la tradición cristiana y su diálogo con la sociedad.', 'Pregrado', 'Facultad de Teología', '8 semestres', 'Presencial', 140, NULL),
    ('Licenciatura en Teología', 'Formación eclesiástica y académica para investigación, docencia y servicio pastoral en teología.', 'Pregrado', 'Facultad de Teología', '8 semestres', 'Presencial', 140, NULL),

    -- Facultad de Derecho Canónico
    ('Licenciatura Eclesiástica en Derecho Canónico', 'Formación eclesiástica especializada en normativa canónica y aplicación pastoral-jurídica en contextos eclesiales.', 'Posgrado', 'Facultad de Derecho Canónico', '8 semestres', 'Presencial', 96, NULL),
    ('Doctorado Eclesiástico en Derecho Canónico', 'Programa doctoral orientado a investigación avanzada en derecho canónico y gobierno eclesial.', 'Posgrado', 'Facultad de Derecho Canónico', '8 semestres', 'Presencial', 110, NULL),
    ('Especialización en Derecho Matrimonial Canónico', 'Profundización en normativa matrimonial canónica, procesos y práctica jurídica eclesiástica.', 'Posgrado', 'Facultad de Derecho Canónico', '2 semestres', 'Virtual', 28, NULL),
    ('Maestría en Derecho Canónico', 'Formación de alto nivel en teoría y práctica del derecho canónico para contextos académicos y pastorales.', 'Posgrado', 'Facultad de Derecho Canónico', '4 semestres', 'Híbrido', 48, NULL),
    ('Diplomado en Derecho Penal Canónico', 'Curso de educación continua en fundamentos, tipologías y procedimientos del derecho penal canónico.', 'Educación Continua', 'Facultad de Derecho Canónico', '120 horas', 'Virtual', NULL, NULL)
) AS v(name, description, category, faculty, duration, modality, credits, image_url)
WHERE NOT EXISTS (
  SELECT 1
  FROM programs p
  WHERE p.name = v.name
);
