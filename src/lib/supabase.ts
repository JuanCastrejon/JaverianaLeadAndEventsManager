import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Valida que una URL sea HTTP o HTTPS válida.
 * Previene el crash de Supabase cuando Vite reemplaza la variable con "" en build.
 */
function isValidUrl(url: string | undefined): url is string {
  if (!url || url.trim() === '') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

let _client: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient | null {
  if (_client) return _client;

  if (!isValidUrl(supabaseUrl) || !supabaseAnonKey?.trim()) {
    console.warn(
      '[Supabase] Variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY no configuradas o inválidas. ' +
      'La conexión a Supabase no estará disponible. ' +
      `URL recibida: "${supabaseUrl ?? '(undefined)'}"`,
    );
    return null;
  }

  _client = createClient(supabaseUrl, supabaseAnonKey);
  return _client;
}

export const supabase = getSupabaseClient();
export { getSupabaseClient };
