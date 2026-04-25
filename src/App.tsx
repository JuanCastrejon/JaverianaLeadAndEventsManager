import { useEffect, useMemo, useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SectionTitle } from './components/layout/SectionTitle';
import { LeadPreviewList } from './components/leads/LeadPreviewList';
import { ProgramFilters } from './components/programs/ProgramFilters';
import { ProgramGrid } from './components/programs/ProgramGrid';
import { useDebounce } from './hooks/useDebounce';
import { useLeads } from './hooks/useLeads';
import { usePrograms } from './hooks/usePrograms';
import { useTheme } from './hooks/useTheme';
import { type ProgramCategory } from './types';
import { API_CONFIG, SECTIONS } from './utils/constants';

const NAV_ITEMS = [
  { id: SECTIONS.HERO, label: 'Inicio' },
  { id: SECTIONS.PROGRAMS, label: 'Programas' },
  { id: SECTIONS.LEAD_FORM, label: 'Inscripcion' },
  { id: SECTIONS.LEADS, label: 'Leads' },
] as const;

export function App() {
  const { mode, toggleTheme } = useTheme();
  const {
    programs,
    allPrograms,
    searchQuery,
    selectedCategory,
    loading,
    error,
    setSearchQuery,
    setCategory,
  } = usePrograms();
  const { leads, totalLeads } = useLeads();
  const [searchInput, setSearchInput] = useState(searchQuery);
  const debouncedSearch = useDebounce(searchInput, API_CONFIG.DEBOUNCE_MS);

  useEffect(() => {
    setSearchQuery(debouncedSearch.trim());
  }, [debouncedSearch, setSearchQuery]);

  const facultiesCount = useMemo(() => {
    return new Set(allPrograms.map((program) => program.faculty)).size;
  }, [allPrograms]);

  const categoryCount = useMemo(() => {
    const counters: Record<ProgramCategory, number> = {
      Pregrado: 0,
      Posgrado: 0,
      'Educación Continua': 0,
    };

    allPrograms.forEach((program) => {
      counters[program.category] += 1;
    });

    return counters;
  }, [allPrograms]);

  return (
    <div className="min-h-screen bg-surface text-text-primary transition-colors duration-300 dark:bg-surface-dark">
      <Header navItems={NAV_ITEMS} mode={mode} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section id={SECTIONS.HERO} className="relative overflow-hidden rounded-[2rem] border border-javeriana-blue/10 bg-gradient-to-br from-white via-javeriana-blue/5 to-javeriana-gold/15 p-8 shadow-card dark:border-javeriana-gold/20 dark:from-surface-dark dark:via-javeriana-blue/20 dark:to-javeriana-gold/10 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-end">
            <div>
              <p className="inline-flex rounded-full border border-javeriana-gold/45 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-javeriana-blue dark:text-javeriana-gold-light">
                Oferta Academica Javeriana
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-family-display)] text-4xl font-bold text-javeriana-blue dark:text-white md:text-5xl">
                Nucleo SPA para exploracion de programas y gestion de leads
              </h1>
              <p className="mt-4 max-w-3xl text-base text-text-secondary dark:text-gray-300 md:text-lg">
                Esta fase consolida la experiencia base: navegacion por secciones, catalogo filtrable de programas y espacio de captura para siguientes iteraciones.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-javeriana-blue p-4 text-white shadow-card">
                <p className="text-xs uppercase tracking-wider text-white/80">Programas</p>
                <p className="mt-2 text-3xl font-bold">{allPrograms.length}</p>
              </div>
              <div className="rounded-2xl bg-javeriana-gold p-4 text-javeriana-blue shadow-card">
                <p className="text-xs uppercase tracking-wider">Facultades</p>
                <p className="mt-2 text-3xl font-bold">{facultiesCount}</p>
              </div>
              <div className="rounded-2xl bg-javeriana-gold-bright p-4 text-javeriana-blue shadow-card">
                <p className="text-xs uppercase tracking-wider">Leads</p>
                <p className="mt-2 text-3xl font-bold">{totalLeads}</p>
              </div>
            </div>
          </div>
        </section>

        <section id={SECTIONS.PROGRAMS} className="mt-16 scroll-mt-28">
          <SectionTitle
            title="Programas academicos"
            subtitle="Explora la oferta por nombre, facultad o categoria. El filtrado ocurre sin recargas para mantener una experiencia fluida en cualquier dispositivo."
          />

          <ProgramFilters
            searchQuery={searchInput}
            selectedCategory={selectedCategory}
            resultCount={programs.length}
            categoryCount={categoryCount}
            onSearchChange={setSearchInput}
            onCategoryChange={setCategory}
          />

          <ProgramGrid programs={programs} loading={loading} error={error} />
        </section>

        <section id={SECTIONS.LEAD_FORM} className="mt-16 scroll-mt-28">
          <SectionTitle
            title="Inscripcion"
            subtitle="La fase siguiente habilitara el formulario completo con validaciones y sincronizacion local/remota."
          />

          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-card border border-gray-100 bg-white p-6 shadow-card dark:border-gray-800 dark:bg-surface-dark-alt">
              <h3 className="font-semibold text-javeriana-blue dark:text-javeriana-gold-light">Validacion en vivo</h3>
              <p className="mt-2 text-sm text-text-secondary dark:text-gray-300">
                Reglas para campos obligatorios, formato de email y recomendacion de dominio institucional.
              </p>
            </article>
            <article className="rounded-card border border-gray-100 bg-white p-6 shadow-card dark:border-gray-800 dark:bg-surface-dark-alt">
              <h3 className="font-semibold text-javeriana-blue dark:text-javeriana-gold-light">Normalizacion</h3>
              <p className="mt-2 text-sm text-text-secondary dark:text-gray-300">
                Limpieza de datos antes del envio para garantizar consistencia en el almacenamiento.
              </p>
            </article>
            <article className="rounded-card border border-gray-100 bg-white p-6 shadow-card dark:border-gray-800 dark:bg-surface-dark-alt">
              <h3 className="font-semibold text-javeriana-blue dark:text-javeriana-gold-light">Persistencia dual</h3>
              <p className="mt-2 text-sm text-text-secondary dark:text-gray-300">
                Registro local inmediato y sincronizacion remota en Supabase para la vista administrativa.
              </p>
            </article>
          </div>
        </section>

        <section id={SECTIONS.LEADS} className="mt-16 scroll-mt-28">
          <SectionTitle
            title="Leads registrados"
            subtitle="Vista preliminar de leads en cache local para validar la estructura de navegacion administrativa del modulo."
          />

          <LeadPreviewList leads={leads} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
