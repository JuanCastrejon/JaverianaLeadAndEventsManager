import type { Lead } from '../../types';

interface LeadPreviewListProps {
  leads: Lead[];
}

export function LeadPreviewList({ leads }: LeadPreviewListProps) {
  if (leads.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-javeriana-blue/25 bg-javeriana-blue/5 p-6 text-sm text-javeriana-blue dark:border-javeriana-gold/30 dark:bg-javeriana-gold/5 dark:text-javeriana-gold-light">
        Aun no hay leads registrados. En la siguiente fase se habilitara el formulario completo.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-card border border-gray-200 bg-white shadow-card dark:border-gray-800 dark:bg-surface-dark-alt">
      <table className="w-full text-left text-sm">
        <thead className="bg-javeriana-blue/8 text-javeriana-blue dark:bg-javeriana-gold/10 dark:text-javeriana-gold-light">
          <tr>
            <th className="px-4 py-3 font-semibold">Nombre</th>
            <th className="px-4 py-3 font-semibold">Email</th>
            <th className="px-4 py-3 font-semibold">Programa</th>
            <th className="px-4 py-3 font-semibold">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {leads.slice(0, 5).map((lead) => (
            <tr key={lead.id} className="border-t border-gray-100 dark:border-gray-800">
              <td className="px-4 py-3">{lead.first_name} {lead.last_name}</td>
              <td className="px-4 py-3">{lead.email}</td>
              <td className="px-4 py-3">{lead.program_id}</td>
              <td className="px-4 py-3">{new Date(lead.created_at).toLocaleDateString('es-CO')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
