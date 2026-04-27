import { motion } from 'framer-motion';
import { Clock, Building2, Monitor, ArrowUpRight } from 'lucide-react';
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
  const imageUrl =
    program.image_url ||
    getProgramImagePath(program.name) ||
    getFacultyImagePath(program.faculty);
  const programUrl = resolveProgramUrl(program.name);

  return (
    <motion.a
      href={programUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`Ver programa ${program.name}`}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group block h-full overflow-hidden rounded-card border border-gray-100 bg-white shadow-card transition-all duration-300 hover:border-javeriana-gold/60 hover:shadow-card-hover dark:border-gray-800 dark:bg-surface-dark-alt dark:hover:border-javeriana-gold/50"
    >
      {/* Imagen con título superpuesto */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={program.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src =
              getProgramImagePath(program.name) || getFacultyImagePath(program.faculty);
          }}
        />
        {/* Gradiente más pronunciado abajo para legibilidad del título */}
        <div className="absolute inset-0 bg-linear-to-t from-javeriana-blue/85 via-javeriana-blue/40 to-transparent" />

        {/* Badge de categoría */}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${categoryBadgeClasses(program.category)}`}
        >
          {program.category}
        </span>

        {/* Título sobre la imagen */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-family-display text-lg font-bold leading-snug text-white drop-shadow-md line-clamp-2">
            {program.name}
          </h3>
        </div>
      </div>

      {/* Cuerpo de la card */}
      <div className="flex flex-col gap-3 p-5">
        {/* Descripción */}
        <p className="line-clamp-3 text-sm leading-relaxed text-text-secondary dark:text-gray-300">
          {program.description}
        </p>

        {/* Metadatos */}
        <dl className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Building2
              className="h-4 w-4 shrink-0 text-javeriana-blue dark:text-javeriana-gold-light"
              aria-hidden="true"
            />
            <dt className="font-semibold text-javeriana-blue dark:text-gray-200">Facultad</dt>
            <dd
              className="ml-auto line-clamp-1 text-right text-text-secondary dark:text-gray-300"
              title={program.faculty}
            >
              {program.faculty}
            </dd>
          </div>

          <div className="flex items-center gap-2">
            <Clock
              className="h-4 w-4 shrink-0 text-javeriana-blue dark:text-javeriana-gold-light"
              aria-hidden="true"
            />
            <dt className="font-semibold text-javeriana-blue dark:text-gray-200">Duración</dt>
            <dd className="ml-auto text-text-secondary dark:text-gray-300">{program.duration}</dd>
          </div>

          <div className="flex items-center gap-2">
            <Monitor
              className="h-4 w-4 shrink-0 text-javeriana-blue dark:text-javeriana-gold-light"
              aria-hidden="true"
            />
            <dt className="font-semibold text-javeriana-blue dark:text-gray-200">Modalidad</dt>
            <dd className="ml-auto text-text-secondary dark:text-gray-300">{program.modality}</dd>
          </div>
        </dl>

        {/* CTA */}
        <div className="mt-1 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-700">
          <span className="text-xs font-semibold uppercase tracking-wide text-javeriana-blue dark:text-javeriana-gold-light">
            Ver programa
          </span>
          <ArrowUpRight className="h-4 w-4 text-javeriana-blue transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-javeriana-gold-light" />
        </div>
      </div>
    </motion.a>
  );
}