import { motion } from 'framer-motion';
import { useEvents } from '../../hooks/useEvents';
import { SECTIONS } from '../../utils/constants';
import { SectionTitle } from '../layout/SectionTitle';
import { EventGrid } from '../events/EventGrid';

export function EventSection() {
  const { events, loading, error, reloadEvents } = useEvents();

  return (
    <>
      <div id={SECTIONS.EVENTS} style={{ scrollMarginTop: '163px' }} />
      <motion.section
        className="mt-25 text-text-primary dark:text-text-light"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <SectionTitle
          title="Eventos Javeriana"
          subtitle="Espacio dedicado a eventos académicos, culturales, pastorales y de bienestar. Cada card te lleva a la fuente oficial de inscripción o detalle."
        />
        <EventGrid events={events} loading={loading} error={error} onRetry={reloadEvents} />
      </motion.section>
    </>
  );
}