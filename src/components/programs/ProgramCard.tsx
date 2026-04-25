import type { Program } from '../../types';

interface ProgramCardProps {
  program: Program;
}

function categoryBadgeClasses(category: Program['category']) {
  if (category === 'Pregrado') {
    return 'bg-javeriana-blue text-white';
  }
  if (category === 'Posgrado') {
    return 'bg-javeriana-gold text-javeriana-blue';
  }
  return 'bg-javeriana-gold-bright text-javeriana-blue';
}

export function ProgramCard({ program }: ProgramCardProps) {
  const imageUrl = program.image_url || '/assets/logo/Logo-PUJ-Bogota-90.svg';

  return (
    <article className="group overflow-hidden rounded-card border border-gray-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover dark:border-gray-800 dark:bg-surface-dark-alt">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={program.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = '/assets/logo/Logo-PUJ-Bogota-90.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-javeriana-blue/70 via-javeriana-blue/30 to-transparent" />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${categoryBadgeClasses(program.category)}`}
        >
          {program.category}
        </span>
      </div>

      <div className="space-y-3 p-5">
        <h3 className="line-clamp-2 font-[family-name:var(--font-family-display)] text-xl font-bold text-javeriana-blue dark:text-javeriana-gold-light">
          {program.name}
        </h3>

        <p className="line-clamp-3 text-sm text-text-secondary dark:text-gray-300">{program.description}</p>

        <dl className="grid gap-2 text-sm">
          <div className="flex items-center justify-between gap-2">
            <dt className="font-semibold text-javeriana-blue dark:text-gray-200">Facultad</dt>
            <dd className="text-right text-text-secondary dark:text-gray-300">{program.faculty}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="font-semibold text-javeriana-blue dark:text-gray-200">Duración</dt>
            <dd className="text-text-secondary dark:text-gray-300">{program.duration}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="font-semibold text-javeriana-blue dark:text-gray-200">Modalidad</dt>
            <dd className="text-text-secondary dark:text-gray-300">{program.modality}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
