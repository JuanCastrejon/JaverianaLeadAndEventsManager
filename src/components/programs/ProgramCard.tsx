import { motion } from 'framer-motion';
import { Clock, Building2, Monitor } from 'lucide-react';
import type { Program } from '../../types';
import { getFacultyImagePath } from '../../utils/facultyImages';
import { resolveProgramUrl } from '../../utils/javerianaLinks';
import { getProgramImagePath } from '../../utils/programImages';

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
  const imageUrl = program.image_url || getProgramImagePath(program.name) || getFacultyImagePath(program.faculty);
  const programUrl = resolveProgramUrl(program.name);

  return (
    <motion.a
      href={programUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`Ver programa ${program.name}`}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group block h-full overflow-hidden rounded-card border border-gray-100 bg-white shadow-card transition-all duration-300 hover:shadow-card-hover dark:border-gray-800 dark:bg-surface-dark-alt"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={program.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = getProgramImagePath(program.name) || getFacultyImagePath(program.faculty);
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-javeriana-blue/70 via-javeriana-blue/30 to-transparent" />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${categoryBadgeClasses(program.category)}`}
        >
          {program.category}
        </span>
      </div>

      <div className="flex h-[calc(100%-12rem)] flex-col space-y-3 p-5">
        <h3 className="line-clamp-2 font-family-display text-xl font-bold text-javeriana-blue dark:text-javeriana-gold-light">
          {program.name}
        </h3>

        <p className="line-clamp-3 text-sm text-text-secondary dark:text-gray-300">{program.description}</p>

        <dl className="mt-auto grid gap-2 pt-1 text-sm">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 shrink-0 text-javeriana-blue dark:text-javeriana-gold-light" aria-hidden="true" />
            <dt className="font-semibold text-javeriana-blue dark:text-gray-200">Facultad</dt>
            <dd className="max-w-44 truncate text-right text-text-secondary dark:text-gray-300" title={program.faculty}>
              {program.faculty}
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-javeriana-blue dark:text-javeriana-gold-light" aria-hidden="true" />
            <dt className="font-semibold text-javeriana-blue dark:text-gray-200">Duración</dt>
            <dd className="text-text-secondary dark:text-gray-300">{program.duration}</dd>
          </div>
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 shrink-0 text-javeriana-blue dark:text-javeriana-gold-light" aria-hidden="true" />
            <dt className="font-semibold text-javeriana-blue dark:text-gray-200">Modalidad</dt>
            <dd className="text-text-secondary dark:text-gray-300">{program.modality}</dd>
          </div>
        </dl>
      </div>
    </motion.a>
  );
}
