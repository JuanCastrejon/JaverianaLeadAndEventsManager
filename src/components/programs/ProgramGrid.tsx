import { AnimatePresence, motion } from 'framer-motion';
import type { Program } from '../../types';
import { ProgramCard } from './ProgramCard';

interface ProgramGridProps {
  programs: Program[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void | Promise<void>;
}

function ProgramSkeletonCard() {
  return (
    <div className="overflow-hidden rounded-card border border-gray-100 bg-white shadow-card dark:border-gray-800 dark:bg-surface-dark-alt">
      <div className="h-48 animate-pulse bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-3 p-5">
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
      </div>
    </div>
  );
}

export function ProgramGrid({ programs, loading, error, onRetry }: ProgramGridProps) {
  if (loading) {
    return (
      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <ProgramSkeletonCard key={`skeleton-${index}`} />
        ))}
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="rounded-card border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <p className="font-semibold">No fue posible cargar los programas.</p>
        <p className="mt-1 text-sm">{error}</p>
        {onRetry ? (
          <button
            type="button"
            className="mt-4 inline-flex items-center rounded-full border border-red-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-red-700 transition hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 dark:border-red-700 dark:text-red-200 dark:hover:bg-red-900/30"
            onClick={() => {
              void onRetry();
            }}
          >
            Reintentar carga
          </button>
        ) : null}
      </motion.div>
    );
  }

  if (programs.length === 0) {
    return (
      <motion.div
        className="rounded-card border border-javeriana-gold/30 bg-javeriana-gold/10 p-10 text-center dark:border-javeriana-gold/20 dark:bg-javeriana-gold/5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="font-family-display text-2xl font-bold text-javeriana-blue dark:text-javeriana-gold-light">
          Sin resultados
        </h3>
        <p className="mt-2 text-sm text-text-secondary dark:text-gray-300">
          Ajusta la búsqueda o cambia la categoría para explorar más opciones académicas.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.04,
          },
        },
      }}
    >
      <AnimatePresence mode="popLayout">
        {programs.map((program) => (
          <motion.div
            key={program.id}
            layout
            className="h-full"
            variants={{
              hidden: { opacity: 0, y: 14, scale: 0.98 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.32, ease: 'easeOut' },
              },
            }}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2 } }}
          >
            <ProgramCard program={program} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
