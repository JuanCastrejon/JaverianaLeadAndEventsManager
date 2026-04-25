import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let _client: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient | null {
  if (_client) return _client;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      '[Supabase] Variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY no configuradas. ' +
      'La conexión a Supabase no estará disponible.',
    );
    return null;
  }

  _client = createClient(supabaseUrl, supabaseAnonKey);
  return _client;
}

export const supabase = getSupabaseClient();
export { getSupabaseClient };
