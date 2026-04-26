import { motion } from 'framer-motion';
import type { EventItem } from '../../types';
import { resolveEventUrl } from '../../utils/javerianaLinks';

interface EventCardProps {
  event: EventItem;
}

function formatEventDate(dateValue: string): string {
  const [year, month, day] = dateValue.split('-').map(Number);
  const localDate = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(localDate);
}

export function EventCard({ event }: EventCardProps) {
  const eventUrl = resolveEventUrl(event.url);
  const hasRegistrationDeadline = Boolean(event.registration_end_date);

  return (
    <motion.a
      href={eventUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`Ver evento ${event.name}`}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group block h-[33rem] overflow-hidden rounded-card border border-gray-100 bg-white shadow-card transition-all duration-300 hover:shadow-card-hover dark:border-gray-800 dark:bg-surface-dark-alt"
    >
      <div className="relative flex h-44 items-end overflow-hidden bg-linear-to-br from-javeriana-blue/95 via-javeriana-blue-light to-javeriana-gold/75 p-4 sm:h-48">
        <div className="absolute inset-0 bg-radial from-javeriana-gold/25 via-transparent to-transparent" />
        <div className="relative flex flex-wrap gap-2">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {event.category}
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm">
            {event.source}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="line-clamp-2 font-family-display text-xl font-bold text-javeriana-blue dark:text-javeriana-gold-light">
          {event.name}
        </h3>

        <p className="line-clamp-3 text-sm leading-6 text-text-secondary dark:text-gray-300">{event.description}</p>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-surface-alt/70 p-3 dark:border-gray-800 dark:bg-surface-dark">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-javeriana-blue/70 dark:text-gray-400">Fecha</p>
            <p className="mt-1 text-sm font-semibold text-javeriana-blue dark:text-gray-200">{formatEventDate(event.start_date)}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-surface-alt/70 p-3 dark:border-gray-800 dark:bg-surface-dark">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-javeriana-blue/70 dark:text-gray-400">Lugar</p>
            <p className="mt-1 line-clamp-2 text-sm font-semibold text-javeriana-blue dark:text-gray-200">
              {event.location ?? 'Por confirmar'}
            </p>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-gray-300">
          <span className="rounded-full bg-javeriana-blue/5 px-3 py-1 dark:bg-white/5">
            {event.organizer ?? 'Javeriana'}
          </span>
          {hasRegistrationDeadline ? (
            <span className="rounded-full bg-javeriana-gold/15 px-3 py-1 text-javeriana-blue dark:text-javeriana-gold-light">
              Inscripción abierta
            </span>
          ) : null}
        </div>
      </div>
    </motion.a>
  );
}
