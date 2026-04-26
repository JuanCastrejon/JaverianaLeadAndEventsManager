const PROGRAMS_BASE_URL = 'https://www.javeriana.edu.co/oferta-programas';
const EVENTS_BASE_URL = 'https://www.javeriana.edu.co/hoy-en-la-javeriana/eventos';

function encodeBase64Utf8(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

export function resolveProgramUrl(programName: string): string {
  const payload = {
    query: programName,
    tipoPrograma: '',
    facultad: '',
    areas: '',
  };

  const encoded = encodeBase64Utf8(JSON.stringify(payload));
  return `${PROGRAMS_BASE_URL}?query-prg=${encodeURIComponent(encoded)}`;
}

export function resolveEventUrl(eventUrl: string | null): string {
  if (eventUrl && /^https?:\/\//i.test(eventUrl)) {
    return eventUrl;
  }

  return EVENTS_BASE_URL;
}
