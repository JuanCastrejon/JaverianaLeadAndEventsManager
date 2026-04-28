import { motion } from 'framer-motion';
import type { Program, ProgramCategory } from '../../types';
import { SECTIONS } from '../../utils/constants';
import { SectionTitle } from '../layout/SectionTitle';
import { ProgramFilters } from '../programs/ProgramFilters';
import { ProgramGrid } from '../programs/ProgramGrid';

interface ProgramSectionProps {
  programs: Program[];
  loading: boolean;
  error: string | null;
  onRetry: () => Promise<void>;
  searchInput: string;
  selectedCategory: string;
  resultCount: number;
  categoryCount: Record<ProgramCategory, number>;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function ProgramSection({ programs, loading, error, onRetry, searchInput, selectedCategory, resultCount, categoryCount, onSearchChange, onCategoryChange }: ProgramSectionProps) {
  return (
    <>
      <div id={SECTIONS.PROGRAMS} style={{ scrollMarginTop: '163px' }} />
      <motion.section
        className="mt-25 text-text-primary dark:text-text-light"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <SectionTitle
          title="Programas académicos"
          subtitle="Explora la oferta por nombre, facultad o categoría. El filtrado ocurre sin recargas para mantener una experiencia fluida en cualquier dispositivo."
        />
        <ProgramFilters
          searchQuery={searchInput}
          selectedCategory={selectedCategory}
          resultCount={resultCount}
          categoryCount={categoryCount}
          onSearchChange={onSearchChange}
          onCategoryChange={onCategoryChange}
        />
        <ProgramGrid programs={programs} loading={loading} error={error} onRetry={onRetry} />
      </motion.section>
    </>
  );
}