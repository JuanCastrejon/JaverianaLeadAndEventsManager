import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Calendar, Trophy, GraduationCap } from 'lucide-react';
import type { Lead, Program } from '../../types';

interface LeadStatsProps {
  leads: Lead[];
  programs: Program[];
}

export function LeadStats({ leads, programs }: LeadStatsProps) {
  const stats = useMemo(() => {
    const programMap = new Map<string, string>();
    programs.forEach((p) => programMap.set(p.id, p.name));

    // Programa más popular
    const programCounts = new Map<string, number>();
    leads.forEach((lead) => {
      const count = programCounts.get(lead.program_id) ?? 0;
      programCounts.set(lead.program_id, count + 1);
    });

    let topProgramId = '';
    let topCount = 0;
    programCounts.forEach((count, id) => {
      if (count > topCount) {
        topCount = count;
        topProgramId = id;
      }
    });

    // Emails con dominio @javeriana.edu.co
    const javerianaEmails = leads.filter((l) =>
      l.email.endsWith('@javeriana.edu.co'),
    ).length;

    // Leads de hoy
    const today = new Date().toISOString().slice(0, 10);
    const todayLeads = leads.filter((l) =>
      l.created_at.startsWith(today),
    ).length;

    return {
      total: leads.length,
      todayLeads,
      topProgram: topProgramId ? programMap.get(topProgramId) ?? '—' : '—',
      topProgramCount: topCount,
      javerianaEmails,
    };
  }, [leads, programs]);

  const cards = [
    {
      label: 'Total leads',
      value: stats.total,
      Icon: BarChart3,
      color: 'bg-javeriana-blue text-white',
    },
    {
      label: 'Registros hoy',
      value: stats.todayLeads,
      Icon: Calendar,
      color: 'bg-javeriana-gold text-javeriana-blue',
    },
    {
      label: 'Programa más popular',
      value: stats.topProgram,
      subtitle: stats.topProgramCount > 0 ? `${stats.topProgramCount} interesados` : undefined,
      Icon: Trophy,
      color: 'bg-javeriana-gold-bright text-javeriana-blue',
    },
    {
      label: 'Correos @javeriana',
      value: stats.javerianaEmails,
      Icon: GraduationCap,
      color: 'bg-javeriana-blue-light text-white',
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className={`rounded-card p-4 shadow-card ${card.color}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
              {card.label}
            </p>
            <card.Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-2 truncate text-2xl font-bold">
            {card.value}
          </p>
          {card.subtitle && (
            <p className="mt-0.5 text-xs opacity-70">{card.subtitle}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
