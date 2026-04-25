import type { Program } from '../../types';
import { ProgramCard } from './ProgramCard';

interface ProgramGridProps {
  programs: Program[];
  loading: boolean;
  error: string | null;
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

export function ProgramGrid({ programs, loading, error }: ProgramGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProgramSkeletonCard key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-card border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
        <p className="font-semibold">No fue posible cargar los programas.</p>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    );
  }

  if (programs.length === 0) {
    return (
      <div className="rounded-card border border-javeriana-gold/30 bg-javeriana-gold/10 p-10 text-center dark:border-javeriana-gold/20 dark:bg-javeriana-gold/5">
        <h3 className="font-[family-name:var(--font-family-display)] text-2xl font-bold text-javeriana-blue dark:text-javeriana-gold-light">
          Sin resultados
        </h3>
        <p className="mt-2 text-sm text-text-secondary dark:text-gray-300">
          Ajusta la búsqueda o cambia la categoría para explorar más opciones académicas.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
}
