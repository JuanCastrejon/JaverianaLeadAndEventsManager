import { motion, type Variants } from 'framer-motion';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { SECTIONS } from '../../utils/constants';
import { SectionTitle } from '../layout/SectionTitle';
import { buildApiDocsSpec } from './apiDocsSpec';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const hasSwaggerSource = Boolean(supabaseUrl?.trim());

interface SwaggerRequestLike {
  headers?: Record<string, string | number | boolean | null | undefined>;
}

/**
 * Normaliza las cabeceras que Swagger envía cuando el usuario autoriza manualmente.
 * No precarga valores desde `.env`; la API Key debe ingresarse de forma explícita en Authorize.
 */
function createRequestInterceptor() {
  return (request: SwaggerRequestLike) => {
    const headers = request.headers ?? {};
    const headerApiKey =
      typeof headers.apikey === 'string' ? headers.apikey.trim() : '';

    request.headers = {
      ...headers,
      ...(headerApiKey
        ? {
            apikey: headerApiKey,
            Authorization: `Bearer ${headerApiKey}`,
          }
        : {}),
      Accept: 'application/json',
    };

    return request;
  };
}

export function ApiDocsSection() {
  const swaggerSpec = hasSwaggerSource
    ? buildApiDocsSpec(supabaseUrl as string)
    : null;

  return (
    <motion.section
      id={SECTIONS.API_DOCS}
      className="mt-16 scroll-mt-28 text-text-primary dark:text-text-light"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionTitle
        title="Documentación API"
        subtitle="Referencia interactiva de los endpoints REST expuestos por Supabase para validar contratos, payloads y respuestas esperadas del frontend."
      />

      {/* 🧠 Info + UX */}
      <div className="mb-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-card border border-javeriana-gold/25 bg-linear-to-br from-javeriana-gold/10 to-white px-5 py-4 text-text-secondary shadow-card dark:border-javeriana-gold/25 dark:from-javeriana-gold/10 dark:to-surface-dark-alt dark:text-gray-200">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em]">
            Recomendación editorial
          </p>
          <p className="mt-2 text-sm leading-6">
            Documenta una respuesta exitosa por endpoint y reutiliza responses comunes para errores.
          </p>
        </div>

        <div className="rounded-card border border-slate-200 bg-slate-50 px-5 py-4 text-sm shadow-card dark:border-slate-700 dark:bg-surface-dark-alt">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em]">
            Autorización
          </p>
          <p className="mt-2">
            Antes de ejecutar endpoints, usa <strong>Authorize</strong> e ingresa la{' '}
            <span className="font-semibold">apikey</span>.
          </p>
        </div>
      </div>

      {swaggerSpec ? (
        <div className="swagger-shell overflow-hidden rounded-card border border-javeriana-blue/10 bg-white p-4 shadow-card dark:border-javeriana-gold/20 dark:bg-surface-dark-alt md:p-6">
          
          <div className="mb-4 rounded-input border border-javeriana-gold/35 bg-javeriana-gold/10 px-3 py-2 text-xs">
            🔐 Swagger no precarga la API Key desde <code>.env</code>. Ingresa tu clave manualmente en <strong>Authorize</strong> para ejecutar consultas.
          </div>

          <SwaggerUI
            spec={swaggerSpec}
            docExpansion="list"
            defaultModelsExpandDepth={-1}
            displayRequestDuration
            persistAuthorization={false}
            requestInterceptor={createRequestInterceptor()}
          />
        </div>
      ) : (
        <div className="rounded-card border border-amber-300 bg-amber-50 p-6 text-amber-900">
          <p className="font-semibold">No se pudo inicializar Swagger UI.</p>
          <p className="mt-2 text-sm">
            Configura VITE_SUPABASE_URL en tu archivo .env.
          </p>
        </div>
      )}
    </motion.section>
  );
}
