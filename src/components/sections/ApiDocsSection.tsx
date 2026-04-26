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
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

const clientApiKey = supabasePublishableKey?.trim() || supabaseAnonKey?.trim() || '';
const hasSwaggerSource = Boolean(supabaseUrl?.trim() && clientApiKey);

interface SwaggerRequestLike {
  headers?: Record<string, string>;
}

function createRequestInterceptor(apiKey: string) {
  return (request: SwaggerRequestLike) => {
    request.headers = {
      ...(request.headers ?? {}),
      apikey: apiKey,
      Accept: 'application/json',
    };

    return request;
  };
}

export function ApiDocsSection() {
  const swaggerSpec = hasSwaggerSource ? buildApiDocsSpec(supabaseUrl as string) : null;

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
        subtitle="Referencia interactiva de los endpoints REST expuestos por Supabase para validar contratos, payloads y respuestas esperadas del frontend. Prioriza una respuesta exitosa por endpoint y responses reutilizables para los errores compartidos."
      />

      <div className="mb-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-card border border-javeriana-gold/25 bg-linear-to-br from-javeriana-gold/10 to-white px-5 py-4 text-text-secondary shadow-card dark:border-javeriana-gold/25 dark:from-javeriana-gold/10 dark:to-surface-dark-alt dark:text-gray-200">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-text-secondary dark:text-javeriana-gold-light/80">
            Recomendación editorial
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary dark:text-gray-200">
            Documenta una respuesta exitosa por endpoint y reutiliza responses comunes para los errores compartidos.
            Así mantienes la spec limpia, fácil de leer y rápida de revisar.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.12em]">
            <span className="rounded-full bg-javeriana-blue/5 px-3 py-1 text-text-primary dark:bg-white/5 dark:text-gray-200">
              200 / 201
            </span>
            <span className="rounded-full bg-javeriana-gold/20 px-3 py-1 text-text-primary dark:bg-javeriana-gold/15 dark:text-javeriana-gold-light">
              400 / 401 / 403 / 500
            </span>
            <span className="rounded-full border border-javeriana-gold/20 px-3 py-1 text-text-primary dark:border-javeriana-gold/20 dark:text-gray-200">
              Reutilizable
            </span>
          </div>
        </div>

        <div className="rounded-card border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-text-secondary shadow-card dark:border-slate-700 dark:bg-surface-dark-alt dark:text-gray-300">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-text-secondary dark:text-gray-400">
            Autorización
          </p>
          <p className="mt-2 leading-6">
            Solo se expone <span className="font-semibold text-javeriana-blue dark:text-javeriana-gold-light">apikey</span>{' '}
            en Swagger. El header <span className="font-semibold">Bearer</span> se omite para simplificar la revisión y
            centrar la demo en el consumo real del frontend.
          </p>
        </div>
      </div>

      {swaggerSpec ? (
        <div className="swagger-shell overflow-hidden rounded-card border border-javeriana-blue/10 bg-white p-4 shadow-card dark:border-javeriana-gold/20 dark:bg-surface-dark-alt md:p-6">
          <div className="mb-4 rounded-input border border-javeriana-gold/35 bg-javeriana-gold/10 px-3 py-2 text-xs text-text-primary dark:border-javeriana-gold/30 dark:bg-javeriana-gold/10 dark:text-javeriana-gold-light">
            Las solicitudes de Swagger usan la clave cliente (publishable/anon) definida en variables de entorno. La
            autenticación se mantiene intencionalmente simple para que el reviewer pueda validar la API sin pasos
            extra.
          </div>

          <SwaggerUI
            spec={swaggerSpec}
            docExpansion="list"
            defaultModelsExpandDepth={-1}
            displayRequestDuration
            requestInterceptor={createRequestInterceptor(clientApiKey)}
          />
        </div>
      ) : (
        <div className="rounded-card border border-amber-300/80 bg-amber-50 p-6 text-amber-900 dark:border-amber-700/70 dark:bg-amber-950/30 dark:text-amber-200">
          <p className="font-semibold">No se pudo inicializar Swagger UI.</p>
          <p className="mt-2 text-sm">
            Configura VITE_SUPABASE_URL y una clave cliente (VITE_SUPABASE_PUBLISHABLE_KEY o VITE_SUPABASE_ANON_KEY)
            en tu archivo .env para habilitar la documentación interactiva de la API.
          </p>
        </div>
      )}
    </motion.section>
  );
}
