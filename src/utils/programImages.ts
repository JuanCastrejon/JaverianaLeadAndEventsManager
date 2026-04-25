const PROGRAM_IMAGE_MAP: Array<{ matcher: RegExp; path: string }> = [
  { matcher: /arquitectura/, path: '/assets/programas/arquitectura.svg' },
  { matcher: /diseno industrial/, path: '/assets/programas/diseno-industrial.svg' },
  { matcher: /gerencia de proyectos de diseno/, path: '/assets/programas/gerencia-proyectos-diseno.svg' },
  { matcher: /medicina/, path: '/assets/programas/medicina.svg' },
  { matcher: /derecho/, path: '/assets/programas/derecho.svg' },
  { matcher: /administracion de empresas/, path: '/assets/programas/administracion-empresas.svg' },
  { matcher: /psicologia/, path: '/assets/programas/psicologia.svg' },
  { matcher: /comunicacion social/, path: '/assets/programas/comunicacion-social.svg' },
  { matcher: /maestria en salud publica/, path: '/assets/programas/maestria-salud-publica.svg' },
  { matcher: /ciencia de datos/, path: '/assets/programas/ciencia-datos.svg' },
];

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function getProgramImagePath(programName: string): string | null {
  const normalizedName = normalizeText(programName);
  const match = PROGRAM_IMAGE_MAP.find((item) => item.matcher.test(normalizedName));
  return match ? match.path : null;
}
