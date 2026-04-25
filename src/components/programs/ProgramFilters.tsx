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
    <div className="mb-8 rounded-card border border-gray-100 bg-white p-5 shadow-card dark:border-gray-800 dark:bg-surface-dark-alt">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-javeriana-blue dark:text-gray-200">
            Buscar por nombre o facultad
          </span>
          <input
            value={searchQuery}
            onChange={(event) => {
              onSearchChange(event.target.value);
            }}
            placeholder="Ej: Ingeniería, Medicina, Derecho"
            className="w-full rounded-input border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-javeriana-gold focus:ring-2 focus:ring-javeriana-gold/30 dark:border-gray-700 dark:bg-surface-dark dark:text-gray-100"
          />
        </label>

        <p className="rounded-full bg-javeriana-blue/5 px-4 py-2 text-sm font-semibold text-javeriana-blue dark:bg-javeriana-gold/10 dark:text-javeriana-gold-light">
          {resultCount} resultados
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            onCategoryChange('');
          }}
          className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
            selectedCategory === ''
              ? 'bg-javeriana-blue text-white'
              : 'bg-gray-100 text-javeriana-blue hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Todos
        </button>

        {PROGRAM_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              onCategoryChange(category);
            }}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
              selectedCategory === category
                ? 'bg-javeriana-gold text-javeriana-blue'
                : 'bg-gray-100 text-javeriana-blue hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category} ({categoryCount[category] ?? 0})
          </button>
        ))}
      </div>
    </div>
  );
}
