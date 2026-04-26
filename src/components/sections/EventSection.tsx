import { motion, type Variants } from 'framer-motion';
import { useEvents } from '../../hooks/useEvents';
import { SECTIONS } from '../../utils/constants';
import { SectionTitle } from '../layout/SectionTitle';
import { EventGrid } from '../events/EventGrid';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export function EventSection() {
  const { events, loading, error, reloadEvents } = useEvents();

  return (
    <motion.section
      id={SECTIONS.EVENTS}
      className="mt-16 scroll-mt-28"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionTitle
        title="Eventos Javeriana"
        subtitle="Espacio dedicado a eventos académicos, culturales, pastorales y de bienestar. Cada card te lleva a la fuente oficial de inscripción o detalle."
      />

      <EventGrid events={events} loading={loading} error={error} onRetry={reloadEvents} />
    </motion.section>
  );
}