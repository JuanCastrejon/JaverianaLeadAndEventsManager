import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { useDebounce } from './hooks/useDebounce';
import { useEvents } from './hooks/useEvents';
import { useLeads } from './hooks/useLeads';
import { usePrograms } from './hooks/usePrograms';
import { useTheme } from './hooks/useTheme';
import { type ProgramCategory } from './types';
import { API_CONFIG, SECTIONS } from './utils/constants';

const ProgramSection = lazy(() => import('./components/sections/ProgramSection').then((module) => ({ default: module.ProgramSection })));
const EventSection = lazy(() => import('./components/sections/EventSection').then((module) => ({ default: module.EventSection })));
const LeadSection = lazy(() => import('./components/sections/LeadSection').then((module) => ({ default: module.LeadSection })));
const ApiDocsSection = lazy(() => import('./components/sections/ApiDocsSection.tsx').then((module) => ({ default: module.ApiDocsSection })));

const NAV_ITEMS = [
  { id: SECTIONS.HERO, label: 'Inicio' },
  { id: SECTIONS.PROGRAMS, label: 'Programas' },
  { id: SECTIONS.EVENTS, label: 'Eventos' },
  { id: SECTIONS.LEAD_FORM, label: 'Inscripción' },
  { id: SECTIONS.LEADS, label: 'Leads' },
  { id: SECTIONS.API_DOCS, label: 'API Docs' },
] as const;

const HERO_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: 'easeOut',
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const HERO_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export function App() {
  const { isDark, toggleTheme } = useTheme();
  const { programs, allPrograms, searchQuery, selectedCategory, loading, error, setSearchQuery, setCategory, reloadPrograms } = usePrograms();
  const { events } = useEvents();
  const { leads, totalLeads, deleteLead } = useLeads();
  const [searchInput, setSearchInput] = useState(searchQuery);
  const debouncedSearch = useDebounce(searchInput, API_CONFIG.DEBOUNCE_MS);

  useEffect(() => {
    setSearchQuery(debouncedSearch.trim());
  }, [debouncedSearch, setSearchQuery]);

  const facultiesCount = useMemo(() => {
    return new Set(allPrograms.map((program) => program.faculty)).size;
  }, [allPrograms]);

  const categoryCount = useMemo(() => {
    const nextCounters: Record<ProgramCategory, number> = {
      Pregrado: 0,
      Posgrado: 0,
      'Educación Continua': 0,
    };

    allPrograms.forEach((program) => {
      nextCounters[program.category] += 1;
    });

    return nextCounters;
  }, [allPrograms]);

  return (
    <div className="min-h-screen bg-surface text-text-primary transition-colors duration-300 dark:bg-surface-dark">
      <Header navItems={NAV_ITEMS} isDark={isDark} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.section
          id={SECTIONS.HERO}
          className="relative overflow-hidden rounded-4xl border border-javeriana-blue/10 bg-linear-to-br from-white via-javeriana-blue/5 to-javeriana-gold/15 p-8 shadow-card dark:border-javeriana-gold/20 dark:from-surface-dark dark:via-javeriana-blue/20 dark:to-javeriana-gold/10 md:p-12"
          variants={HERO_CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
        >
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-end">
            <div>
              <motion.p
                variants={HERO_ITEM_VARIANTS}
                className="inline-flex rounded-full border border-javeriana-gold/45 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-javeriana-blue dark:text-javeriana-gold-light"
              >
                Oferta Académica Javeriana
              </motion.p>
              <motion.h1
                variants={HERO_ITEM_VARIANTS}
                className="mt-4 font-family-display text-4xl font-bold text-javeriana-blue dark:text-white md:text-5xl"
              >
                Gestión de prospectos y oferta académica
              </motion.h1>
              <motion.p
                variants={HERO_ITEM_VARIANTS}
                className="mt-4 max-w-3xl text-base text-text-secondary dark:text-gray-300 md:text-lg"
              >
                Explora la oferta de programas, registra tu interés y consulta el estado de los prospectos académicos en tiempo real.
              </motion.p>
            </div>

            <motion.div variants={HERO_ITEM_VARIANTS} className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
              <motion.div
                whileHover={{ y: -3 }}
                className="min-w-0 rounded-2xl bg-javeriana-blue p-3 text-white shadow-card sm:p-4"
              >
                <p className="truncate text-[10px] leading-tight uppercase tracking-[0.08em] text-white/80 sm:text-[11px]">Programas</p>
                <p className="mt-2 text-2xl font-bold sm:text-3xl">{allPrograms.length}</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -3 }}
                className="min-w-0 rounded-2xl bg-javeriana-gold p-3 text-javeriana-blue shadow-card sm:p-4"
              >
                <p className="truncate text-[10px] leading-tight uppercase tracking-[0.08em] sm:text-[11px]">Facultades</p>
                <p className="mt-2 text-2xl font-bold sm:text-3xl">{facultiesCount}</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -3 }}
                className="min-w-0 rounded-2xl bg-javeriana-gold-bright p-3 text-javeriana-blue shadow-card sm:p-4"
              >
                <p className="truncate text-[10px] leading-tight uppercase tracking-[0.08em] sm:text-[11px]">Leads</p>
                <p className="mt-2 text-2xl font-bold sm:text-3xl">{totalLeads}</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -3 }}
                className="min-w-0 rounded-2xl border border-javeriana-gold/35 bg-white/70 p-3 text-javeriana-blue shadow-card backdrop-blur-sm dark:border-javeriana-gold/25 dark:bg-surface-dark-alt dark:text-javeriana-gold-light sm:p-4"
              >
                <p className="truncate text-[10px] leading-tight uppercase tracking-[0.08em] sm:text-[11px]">Eventos</p>
                <p className="mt-2 text-2xl font-bold sm:text-3xl">{events.length}</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <Suspense fallback={<SectionPlaceholder />}> 
          <ProgramSection
            programs={programs}
            loading={loading}
            error={error}
            onRetry={reloadPrograms}
            searchInput={searchInput}
            selectedCategory={selectedCategory}
            resultCount={programs.length}
            categoryCount={categoryCount}
            onSearchChange={setSearchInput}
            onCategoryChange={setCategory}
          />
        </Suspense>

        <Suspense fallback={<SectionPlaceholder />}> 
          <EventSection />
        </Suspense>

        <Suspense fallback={<SectionPlaceholder />}> 
          <LeadSection leads={leads} programs={allPrograms} onDelete={deleteLead} />
        </Suspense>

        <Suspense fallback={<SectionPlaceholder />}> 
          <ApiDocsSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

function SectionPlaceholder() {
  return (
    <div className="mt-16 rounded-card border border-gray-100 bg-white p-8 shadow-card dark:border-gray-800 dark:bg-surface-dark-alt">
      <div className="h-8 w-72 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="mt-4 h-1.5 w-20 animate-pulse rounded-full bg-javeriana-gold/60" />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={`section-placeholder-${index}`} className="h-72 animate-pulse rounded-card bg-gray-100 dark:bg-gray-800" />
        ))}
      </div>
    </div>
  );
}
