const FACULTY_IMAGE_MAP: Record<string, string> = {
  'facultad de arquitectura y diseno': '/assets/facultades/arquitectura-diseno/arquitectura.png',
  'facultad de artes': '/assets/facultades/artes/edificio-artes.png',
  'facultad de ciencias': '/assets/facultades/ciencias/ciencias.png',
  'facultad de ciencias economicas y administrativas': '/assets/facultades/ciencias-economicas-administrativas/cea.png',
  'facultad de ciencias juridicas': '/assets/facultades/ciencias-juridicas/juridicas.png',
  'facultad de ciencias politicas y relaciones internacionales': '/assets/facultades/ciencias-politicas-relaciones-internacionales/politicas.png',
  'facultad de ciencias sociales': '/assets/facultades/ciencias-sociales/ciencias-sociales.png',
  'facultad de comunicacion y lenguaje': '/assets/facultades/comunicacion-lenguaje/comunicacion.png',
  'facultad de derecho canonico': '/assets/facultades/derecho-canonico/derecho-canonico.png',
  'facultad de educacion': '/assets/facultades/educacion/educacion.png',
  'facultad de enfermeria': '/assets/facultades/enfermeria/enfermeria.png',
  'facultad de estudios ambientales y rurales': '/assets/facultades/estudios-ambientales-rurales/fear.png',
  'facultad de filosofia': '/assets/facultades/filosofia/filosofia.png',
  'facultad de ingenieria': '/assets/facultades/ingenieria/ingenieria.png',
  'facultad de medicina': '/assets/facultades/medicina/medicina.png',
  'facultad de odontologia': '/assets/facultades/odontologia/odontologia.png',
  'facultad de psicologia': '/assets/facultades/psicologia/psicologia.png',
  'facultad de teologia': '/assets/facultades/teologia/teologia.png',
};

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function getFacultyImagePath(faculty: string): string {
  const normalizedFaculty = normalizeText(faculty);
  return FACULTY_IMAGE_MAP[normalizedFaculty] ?? '/assets/facultades/ingenieria/ingenieria.png';
}