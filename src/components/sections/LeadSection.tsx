import { motion, type Variants } from 'framer-motion';
import type { Lead, Program } from '../../types';
import { SECTIONS } from '../../utils/constants';
import { SectionTitle } from '../layout/SectionTitle';
import { LeadForm } from '../leads/LeadForm';
import { LeadList } from '../leads/LeadList';
import { LeadStats } from '../leads/LeadStats';

interface LeadSectionProps {
  leads: Lead[];
  programs: Program[];
  onDelete: (id: string) => void;
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export function LeadSection({ leads, programs, onDelete }: LeadSectionProps) {
  return (
    <>
      <div id={SECTIONS.LEAD_FORM} style={{ scrollMarginTop: '163px' }} />
      <motion.section
        className="mt-25 text-text-primary dark:text-text-light"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionTitle
          title="Registro de interés"
          subtitle="Completa el formulario para registrar tu interés en un programa académico. Tus datos se almacenan localmente y se sincronizan con el servidor."
        />
        <LeadForm />

        <div id={SECTIONS.LEADS} style={{ scrollMarginTop: '163px' }} />
        <div className="mt-25">
          <SectionTitle
            title="Leads registrados"
            subtitle="Vista administrativa de prospectos registrados con métricas y gestión básica."
          />
          <LeadStats leads={leads} programs={programs} />
          <div className="mt-6">
            <LeadList leads={leads} programs={programs} onDelete={onDelete} />
          </div>
        </div>
      </motion.section>
    </>
  );
}