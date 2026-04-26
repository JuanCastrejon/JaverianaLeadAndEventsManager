-- Seed: Eventos institucionales y de vida universitaria
-- Fuentes: Hoy en la Javeriana + Medio Universitario

SET client_encoding TO 'UTF8';

INSERT INTO javeriana_events (
  name,
  description,
  category,
  source,
  event_code,
  organizer,
  location,
  start_date,
  end_date,
  registration_end_date,
  url,
  image_url
)
SELECT *
FROM (
  VALUES
    (
      'Expojaveriana Posgrados 2026',
      'Jornada de divulgación de la oferta de posgrados de la universidad.',
      'Académico',
      'Hoy en la Javeriana',
      NULL,
      'Pontificia Universidad Javeriana',
      'Campus Bogotá',
      DATE '2026-04-15',
      DATE '2026-04-15',
      NULL,
      'https://www.javeriana.edu.co/hoy-en-la-javeriana/eventos',
      NULL
    ),
    (
      'Celebración eucarística diaria',
      'Celebración litúrgica diaria para la comunidad universitaria.',
      'Pastoral',
      'Hoy en la Javeriana',
      NULL,
      'Pastoral Universitaria',
      'Campus Bogotá',
      DATE '2026-04-24',
      DATE '2026-04-24',
      NULL,
      'https://www.javeriana.edu.co/hoy-en-la-javeriana/eventos',
      NULL
    ),
    (
      'Fest yo soy',
      'Evento de integración y participación estudiantil.',
      'Cultural',
      'Hoy en la Javeriana',
      NULL,
      'Pontificia Universidad Javeriana',
      'Campus Bogotá',
      DATE '2026-04-25',
      DATE '2026-04-25',
      NULL,
      'https://www.javeriana.edu.co/hoy-en-la-javeriana/eventos',
      NULL
    ),
    (
      'Eucaristía Semana de Acogida',
      'Celebración eucarística en el marco de la semana de acogida.',
      'Pastoral',
      'Hoy en la Javeriana',
      NULL,
      'Pastoral Universitaria',
      'Campus Bogotá',
      DATE '2026-07-22',
      DATE '2026-07-22',
      NULL,
      'https://www.javeriana.edu.co/hoy-en-la-javeriana/eventos',
      NULL
    ),
    (
      'Eucaristía solemnidad de San Ignacio de Loyola',
      'Celebración solemne en honor a San Ignacio de Loyola.',
      'Pastoral',
      'Hoy en la Javeriana',
      NULL,
      'Pastoral Universitaria',
      'Campus Bogotá',
      DATE '2026-07-31',
      DATE '2026-07-31',
      NULL,
      'https://www.javeriana.edu.co/hoy-en-la-javeriana/eventos',
      NULL
    ),
    (
      'Eucaristía memoria San Pedro Claver',
      'Celebración conmemorativa de San Pedro Claver.',
      'Pastoral',
      'Hoy en la Javeriana',
      NULL,
      'Pastoral Universitaria',
      'Campus Bogotá',
      DATE '2026-09-09',
      DATE '2026-09-09',
      NULL,
      'https://www.javeriana.edu.co/hoy-en-la-javeriana/eventos',
      NULL
    ),
    (
      'Eucaristía Día de la Universidad',
      'Celebración del aniversario de la fundación de la Universidad Javeriana.',
      'Institucional',
      'Hoy en la Javeriana',
      NULL,
      'Pastoral Universitaria',
      'Auditorio Alfonso Quintana SJ',
      DATE '2026-10-01',
      DATE '2026-10-01',
      NULL,
      'https://www.javeriana.edu.co/hoy-en-la-javeriana/eventos',
      NULL
    ),
    (
      'Francofonía: cooperación y juventud en 2026',
      'Espacio para dialogar sobre impacto de la Francofonía y oportunidades de cooperación académica y cultural.',
      'Académico',
      'Hoy en la Javeriana',
      NULL,
      'Pontificia Universidad Javeriana',
      'El Mirador, Universidad Javeriana',
      DATE '2026-03-05',
      DATE '2026-03-05',
      NULL,
      'https://www.javeriana.edu.co/hoy-en-la-javeriana/eventos',
      NULL
    ),
    (
      'PROGRAMA EJERCICIOS FISICO ( FACULTAD ARTES EJERCICIOS FISICO PERSONAL ADMINISTRATIVO)',
      'Programa de actividad física dirigido a personal administrativo y comunidad asociada.',
      'Bienestar',
      'Medio Universitario',
      '17307',
      'Centro Javeriano Formac.Deport',
      'Campus Bogotá',
      DATE '2026-01-01',
      DATE '2026-06-30',
      DATE '2026-06-05',
      'https://www.javeriana.edu.co/xieinsc/inscripcion.jsf?idEvento=17307&cicloLectivo=2610&back=true',
      NULL
    ),
    (
      'PRIMEROS AUXILIOS EMOCIONALES',
      'Actividad de apoyo psicoemocional para la comunidad universitaria.',
      'Bienestar',
      'Medio Universitario',
      '17287',
      'Asesoría Psicológica y Salud',
      'Campus Bogotá',
      DATE '2026-04-16',
      DATE '2026-04-20',
      DATE '2026-04-20',
      'https://www.javeriana.edu.co/xieinsc/inscripcion.jsf?idEvento=17287&cicloLectivo=2610&back=true',
      NULL
    ),
    (
      'JORNADA TRANCISIÓN VIDA UNIVERSITARIA',
      'Jornada de acompañamiento para transición e integración a la vida universitaria.',
      'Bienestar',
      'Medio Universitario',
      '17271',
      'Asesoría Psicológica y Salud',
      'Campus Bogotá',
      DATE '2026-04-14',
      DATE '2026-04-21',
      DATE '2026-04-21',
      'https://www.javeriana.edu.co/xieinsc/index.jsf',
      NULL
    ),
    (
      'LUNADA ODONTOLOGÍA 09 ABRIL',
      'Actividad cultural y de comunidad para estudiantes de Odontología.',
      'Cultural',
      'Medio Universitario',
      '17255',
      'Centro de Gestión Cultural',
      'Campus Bogotá',
      DATE '2026-04-09',
      DATE '2026-04-09',
      DATE '2026-04-17',
      'https://www.javeriana.edu.co/xieinsc/inscripcion.jsf?idEvento=17255&cicloLectivo=2610&back=true',
      NULL
    ),
    (
      'MIÉRCOLES DE CUENTO 08 ABRIL',
      'Espacio cultural de narración y lectura para la comunidad universitaria.',
      'Cultural',
      'Medio Universitario',
      '17254',
      'Centro de Gestión Cultural',
      'Campus Bogotá',
      DATE '2026-04-08',
      DATE '2026-04-08',
      DATE '2026-04-17',
      'https://www.javeriana.edu.co/xieinsc/inscripcion.jsf?idEvento=17254&cicloLectivo=2610&back=true',
      NULL
    )
) AS v(
  name,
  description,
  category,
  source,
  event_code,
  organizer,
  location,
  start_date,
  end_date,
  registration_end_date,
  url,
  image_url
)
WHERE NOT EXISTS (
  SELECT 1
  FROM javeriana_events e
  WHERE e.name = v.name
    AND e.start_date = v.start_date
);
