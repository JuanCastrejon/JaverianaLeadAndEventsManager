import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className="font-family-display text-3xl font-bold text-javeriana-blue dark:text-white md:text-4xl">
        {title}
      </h2>
      <motion.div
        className="mt-3 h-1.5 w-20 rounded-full bg-javeriana-gold"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 80, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.12, ease: 'easeOut' }}
      />
      <p className="mt-4 max-w-3xl text-sm text-text-secondary dark:text-gray-300 md:text-base">
        {subtitle}
      </p>
    </motion.div>
  );
}
