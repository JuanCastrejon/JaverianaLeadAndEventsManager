import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Calendar, Trash2, ClipboardList } from 'lucide-react';
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
        <ClipboardList className="mx-auto h-12 w-12 text-javeriana-blue/40 dark:text-javeriana-gold/40" aria-hidden="true" />
        <p className="mt-3 text-sm font-medium text-javeriana-blue dark:text-javeriana-gold-light">
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
        <div className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-javeriana-blue dark:text-javeriana-gold-light" aria-hidden="true" />
          <p className="text-sm font-semibold text-javeriana-blue dark:text-javeriana-gold-light">
            {leads.length} {leads.length === 1 ? 'registro' : 'registros'}
          </p>
        </div>
        <span className="rounded-full bg-javeriana-gold/20 px-2.5 py-0.5 text-xs font-bold text-javeriana-blue dark:text-javeriana-gold-light">
          localStorage
        </span>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-text-secondary dark:border-gray-800 dark:text-gray-400">
              <th className="px-4 py-3 font-semibold">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5" aria-hidden="true" />
                  Nombre
                </div>
              </th>
              <th className="px-4 py-3 font-semibold">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  Email
                </div>
              </th>
              <th className="px-4 py-3 font-semibold">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  Teléfono
                </div>
              </th>
              <th className="px-4 py-3 font-semibold">Programa</th>
              <th className="px-4 py-3 font-semibold">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  Fecha
                </div>
              </th>
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
                    <span className="inline-block max-w-45 truncate rounded-full bg-javeriana-blue/8 px-2.5 py-0.5 text-xs font-medium text-javeriana-blue dark:bg-javeriana-gold/15 dark:text-javeriana-gold-light">
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
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
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
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-javeriana-blue dark:text-javeriana-gold-light shrink-0" aria-hidden="true" />
                    <p className="font-medium text-text-primary dark:text-white">
                      {lead.first_name} {lead.last_name}
                    </p>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-text-secondary dark:text-gray-400 shrink-0" aria-hidden="true" />
                    <p className="text-xs text-text-secondary dark:text-gray-400">{lead.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onDelete(lead.id)}
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-error/10 hover:text-error shrink-0"
                  aria-label={`Eliminar lead ${lead.first_name}`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1.5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-javeriana-blue/8 px-2 py-0.5 text-xs text-javeriana-blue dark:bg-javeriana-gold/15 dark:text-javeriana-gold-light">
                  <Phone className="h-3 w-3" aria-hidden="true" />
                  {programMap.get(lead.program_id) ?? 'Programa'}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-text-secondary dark:text-gray-400">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  <span>
                    {new Date(lead.created_at).toLocaleDateString('es-CO')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
