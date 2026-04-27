import { motion, type Variants } from "framer-motion";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { SECTIONS } from "../../utils/constants";
import { SectionTitle } from "../layout/SectionTitle";
import { buildApiDocsSpec } from "./apiDocsSpec";
import { useEffect } from "react";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const DEFAULT_SWAGGER_BASE_URL = "https://dpoysijrptxtpfumawju.supabase.co";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;

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
    const legacyApiKeyHeader = headers["API key"];
    const headerApiKey =
      typeof headers.apikey === "string"
        ? headers.apikey.trim()
        : typeof legacyApiKeyHeader === "string"
          ? legacyApiKeyHeader.trim()
          : "";

    const sanitizedHeaders = { ...headers };
    delete sanitizedHeaders["API key"];

    request.headers = {
      ...sanitizedHeaders,
      ...(headerApiKey
        ? {
            apikey: headerApiKey,
            Authorization: `Bearer ${headerApiKey}`,
          }
        : {}),
      Accept: "application/json",
    };

    return request;
  };
}

export function ApiDocsSection() {
  const configuredSwaggerBaseUrl = supabaseUrl?.trim() ?? "";
  const isUsingFallbackSwaggerSource = configuredSwaggerBaseUrl.length === 0;
  const swaggerSpec = buildApiDocsSpec(
    isUsingFallbackSwaggerSource
      ? DEFAULT_SWAGGER_BASE_URL
      : configuredSwaggerBaseUrl,
  );

  useEffect(() => {
    // Reemplazar (apiKey) con (API key) en el modal de Swagger
    const timer = setTimeout(() => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
      );

      let node;
      while ((node = walker.nextNode())) {
        if (node.textContent?.includes("(apiKey)")) {
          node.textContent = node.textContent.replace("(apiKey)", "(API key)");
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Usar MutationObserver para vigilar cambios en el DOM y reemplazar (apiKey)
    const observer = new MutationObserver(() => {
      const elements = document.querySelectorAll("h4, heading");
      elements.forEach((el) => {
        const text = el.textContent || "";
        if (text.includes("(apiKey)") && !text.includes("(API key)")) {
          el.innerHTML = el.innerHTML.replace("(apiKey)", "(API key)");
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: false,
    });

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div id={SECTIONS.API_DOCS} style={{ scrollMarginTop: "163px" }} />
      <motion.section
        className="mt-25 text-text-primary dark:text-text-light"
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
              Documenta una respuesta exitosa por endpoint y reutiliza responses
              comunes para errores.
            </p>
          </div>

          <div className="rounded-card border border-slate-200 bg-slate-50 px-5 py-4 text-sm shadow-card dark:border-slate-700 dark:bg-surface-dark-alt">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em]">
              Autorización
            </p>
            <p className="mt-2">
              Antes de ejecutar endpoints, usa <strong>Authorize</strong> e
              ingresa la <span className="font-semibold">API key</span>.
            </p>
          </div>
        </div>

        <div className="swagger-shell overflow-auto rounded-card border border-javeriana-blue/10 bg-white p-4 shadow-card dark:border-javeriana-gold/20 dark:bg-surface-dark-alt md:p-6">
          <div className="mb-4 rounded-input border border-javeriana-gold/35 bg-javeriana-gold/10 px-3 py-2 text-xs">
            🔐 Ingresa tu <strong>API key</strong> en el campo de autorización
            para ejecutar consultas contra la API.
            {isUsingFallbackSwaggerSource ? (
              <p className="mt-1 text-[11px] text-text-secondary dark:text-gray-300">
                Entorno sin VITE_SUPABASE_URL: se usa servidor por defecto para
                la documentación.
              </p>
            ) : null}
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
      </motion.section>
    </>
  );
}
