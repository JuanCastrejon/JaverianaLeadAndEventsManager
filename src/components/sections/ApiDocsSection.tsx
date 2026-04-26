import { motion, type Variants } from 'framer-motion';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { SECTIONS } from '../../utils/constants';
import { SectionTitle } from '../layout/SectionTitle';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const hasSwaggerSource = Boolean(supabaseUrl?.trim() && supabaseAnonKey?.trim());
const swaggerSpecUrl = hasSwaggerSource
  ? `${supabaseUrl}/rest/v1/?apikey=${encodeURIComponent(supabaseAnonKey as string)}`
  : null;

export function ApiDocsSection() {
  return (
    <motion.section
      id={SECTIONS.API_DOCS}
      className="mt-16 scroll-mt-28"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionTitle
        title="Documentación API"
        subtitle="Referencia interactiva de los endpoints REST expuestos por Supabase para validar contratos y payloads del frontend."
      />

      {swaggerSpecUrl ? (
        <div className="swagger-shell overflow-hidden rounded-card border border-gray-100 bg-white p-4 shadow-card dark:border-gray-800 dark:bg-surface-dark-alt md:p-6">
          <SwaggerUI
            url={swaggerSpecUrl}
            docExpansion="list"
            defaultModelsExpandDepth={-1}
            displayRequestDuration
            requestInterceptor={(request) => {
              request.headers.apikey = supabaseAnonKey;
              request.headers.Authorization = `Bearer ${supabaseAnonKey}`;
              request.headers.Accept = 'application/openapi+json';
              return request;
            }}
          />
        </div>
      ) : (
        <div className="rounded-card border border-amber-300/80 bg-amber-50 p-6 text-amber-900 dark:border-amber-700/70 dark:bg-amber-950/30 dark:text-amber-200">
          <p className="font-semibold">No se pudo inicializar Swagger UI.</p>
          <p className="mt-2 text-sm">
            Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env para habilitar la documentación
            interactiva de la API.
          </p>
        </div>
      )}
    </motion.section>
  );
}
