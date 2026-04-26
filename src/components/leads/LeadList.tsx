import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Lead, Program } from '../../types';

interface LeadListProps {
  leads: Lead[];
  programs: Program[];
  onDelete: (id: string) => void;
}

export function LeadList({ leads, programs, onDelete }: LeadListProps) {
  const programMap = useMemo(() => {
    const map = new Map<string, string>();
    programs.forEach((p) => map.set(p.id, p.name));
    return map;
  }, [programs]);

  if (leads.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-javeriana-blue/25 bg-javeriana-blue/5 p-8 text-center dark:border-javeriana-gold/30 dark:bg-javeriana-gold/5">
        <p className="text-2xl">📋</p>
        <p className="mt-2 text-sm font-medium text-javeriana-blue dark:text-javeriana-gold-light">
          Aún no hay leads registrados
        </p>
        <p className="mt-1 text-xs text-text-secondary dark:text-gray-400">
          Usa el formulario de inscripción para registrar el primer prospecto.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-card border border-gray-200 bg-white shadow-card dark:border-gray-800 dark:bg-surface-dark-alt">
      {/* Header de la tabla */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-javeriana-blue/5 px-4 py-3 dark:border-gray-800 dark:bg-javeriana-gold/5">
        <p className="text-sm font-semibold text-javeriana-blue dark:text-javeriana-gold-light">
          {leads.length} {leads.length === 1 ? 'registro' : 'registros'}
        </p>
        <span className="rounded-full bg-javeriana-gold/20 px-2.5 py-0.5 text-xs font-bold text-javeriana-blue dark:text-javeriana-gold-light">
          localStorage
        </span>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-text-secondary dark:border-gray-800 dark:text-gray-400">
              <th className="px-4 py-3 font-semibold">Nombre completo</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Teléfono</th>
              <th className="px-4 py-3 font-semibold">Programa</th>
              <th className="px-4 py-3 font-semibold">Fecha</th>
              <th className="px-4 py-3 font-semibold sr-only">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {leads.map((lead) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-50 transition-colors hover:bg-javeriana-blue/3 dark:border-gray-800 dark:hover:bg-white/3"
                >
                  <td className="px-4 py-3 font-medium">
                    {lead.first_name} {lead.last_name}
                  </td>
                  <td className="px-4 py-3 text-text-secondary dark:text-gray-300">
                    {lead.email}
                  </td>
                  <td className="px-4 py-3 text-text-secondary dark:text-gray-300">
                    {lead.phone || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block max-w-[180px] truncate rounded-full bg-javeriana-blue/8 px-2.5 py-0.5 text-xs font-medium text-javeriana-blue dark:bg-javeriana-gold/15 dark:text-javeriana-gold-light">
                      {programMap.get(lead.program_id) ?? lead.program_id}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-text-secondary dark:text-gray-400">
                    {new Date(lead.created_at).toLocaleDateString('es-CO', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onDelete(lead.id)}
                      className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-error/10 hover:text-error"
                      aria-label={`Eliminar lead ${lead.first_name} ${lead.last_name}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-2 p-3 md:hidden">
        <AnimatePresence>
          {leads.map((lead) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-lg border border-gray-100 bg-surface-alt p-3 dark:border-gray-800 dark:bg-surface-dark"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-text-primary dark:text-white">
                    {lead.first_name} {lead.last_name}
                  </p>
                  <p className="mt-0.5 text-xs text-text-secondary dark:text-gray-400">{lead.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onDelete(lead.id)}
                  className="rounded-lg p-1 text-gray-400 hover:text-error"
                  aria-label={`Eliminar lead ${lead.first_name}`}
                >
                  ✕
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="truncate rounded-full bg-javeriana-blue/8 px-2 py-0.5 text-xs text-javeriana-blue dark:bg-javeriana-gold/15 dark:text-javeriana-gold-light">
                  {programMap.get(lead.program_id) ?? 'Programa'}
                </span>
                <span className="text-xs text-text-secondary dark:text-gray-400">
                  {new Date(lead.created_at).toLocaleDateString('es-CO')}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
