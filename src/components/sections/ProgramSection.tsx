import { motion, type Variants } from 'framer-motion';
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

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export function ProgramSection({
  programs,
  loading,
  error,
  onRetry,
  searchInput,
  selectedCategory,
  resultCount,
  categoryCount,
  onSearchChange,
  onCategoryChange,
}: ProgramSectionProps) {
  return (
    <motion.section
      id={SECTIONS.PROGRAMS}
      className="mt-16 scroll-mt-28"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
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
  );
}