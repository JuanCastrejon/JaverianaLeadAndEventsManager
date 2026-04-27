import { AnimatePresence, motion } from 'framer-motion';
import { Search, Zap } from 'lucide-react';
import { PROGRAM_CATEGORIES, type ProgramCategory } from '../../types';

interface ProgramFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  resultCount: number;
  categoryCount: Record<ProgramCategory, number>;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function ProgramFilters({
  searchQuery,
  selectedCategory,
  resultCount,
  categoryCount,
  onSearchChange,
  onCategoryChange,
}: ProgramFiltersProps) {
  return (
    <motion.div
      className="mb-8 rounded-card border border-gray-100 bg-white p-5 shadow-card dark:border-gray-800 dark:bg-surface-dark-alt"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-javeriana-blue dark:text-gray-200">
            <Search className="h-4 w-4" aria-hidden="true" />
            Buscar por nombre o facultad
          </span>
          <div className="relative">
            <input
              value={searchQuery}
              onChange={(event) => {
                onSearchChange(event.target.value);
              }}
              placeholder="Ej: Ingeniería, Medicina, Derecho"
              className="w-full rounded-input border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-javeriana-gold focus:ring-2 focus:ring-javeriana-gold/30 dark:border-gray-700 dark:bg-surface-dark dark:text-gray-100"
            />
          </div>
        </label>

        <div>
          <AnimatePresence mode="wait">
            <motion.p
              key={resultCount}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="rounded-full bg-javeriana-blue/5 px-4 py-2 text-sm font-semibold text-javeriana-blue dark:bg-javeriana-gold/10 dark:text-javeriana-gold-light"
            >
              {resultCount} resultados
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <motion.button
          type="button"
          onClick={() => {
            onCategoryChange('');
          }}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
            selectedCategory === ''
              ? 'bg-javeriana-blue text-white'
              : 'bg-gray-100 text-javeriana-blue hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <Zap className="h-3.5 w-3.5" aria-hidden="true" />
          Todos
        </motion.button>

        {PROGRAM_CATEGORIES.map((category) => (
          <motion.button
            key={category}
            type="button"
            onClick={() => {
              onCategoryChange(category);
            }}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
              selectedCategory === category
                ? 'bg-javeriana-gold text-javeriana-blue'
                : 'bg-gray-100 text-javeriana-blue hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category} ({categoryCount[category] ?? 0})
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

