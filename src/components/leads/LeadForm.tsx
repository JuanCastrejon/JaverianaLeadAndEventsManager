import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLeads } from '../../hooks/useLeads';
import { usePrograms } from '../../hooks/usePrograms';
import type { LeadFormData } from '../../types';
import { validateEmail, validatePhone } from '../../utils/validators';

const INITIAL_FORM: LeadFormData = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  program_id: '',
};

export function LeadForm() {
  const { submitLead } = useLeads();
  const { allPrograms } = usePrograms();
  const [form, setForm] = useState<LeadFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailHint, setEmailHint] = useState('');

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Limpiar error al corregir
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    // Recomendación de dominio @javeriana.edu.co
    if (name === 'email') {
      const atIndex = value.indexOf('@');
      if (atIndex > 0 && !value.includes('@javeriana.edu.co') && value.length > atIndex + 1) {
        setEmailHint('¿Quizás quisiste escribir @javeriana.edu.co?');
      } else {
        setEmailHint('');
      }
    }
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validar campo individual al perder foco
    if (name === 'email' && value && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: 'El correo electrónico no es válido' }));
    }
    if (name === 'phone' && value && !validatePhone(value)) {
      setErrors((prev) => ({ ...prev, phone: 'El número de teléfono no es válido' }));
    }
    if ((name === 'first_name' || name === 'last_name') && value.trim().length > 0 && value.trim().length < 2) {
      setErrors((prev) => ({ ...prev, [name]: 'Debe tener al menos 2 caracteres' }));
    }
  }

  function applyEmailHint() {
    const atIndex = form.email.indexOf('@');
    if (atIndex > 0) {
      const localPart = form.email.substring(0, atIndex);
      setForm((prev) => ({ ...prev, email: `${localPart}@javeriana.edu.co` }));
      setEmailHint('');
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const result = await submitLead(form);

    if (!result.success) {
      setErrors(result.errors);
      setSubmitting(false);
      return;
    }

    // Éxito
    setForm(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setEmailHint('');
    setSuccess(true);
    setSubmitting(false);

    setTimeout(() => setSuccess(false), 4000);
  }

  const hasError = (field: string) => touched[field] && errors[field];

  return (
    <form
      id="lead-form"
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-2xl space-y-6"
    >
      {/* Alerta de éxito */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="rounded-card border border-success/30 bg-success/10 px-4 py-3 text-sm font-medium text-success"
          >
            ✓ Lead registrado exitosamente. Los datos se almacenaron localmente y se enviaron al servidor.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Nombre */}
        <div>
          <label htmlFor="first_name" className="mb-1.5 block text-sm font-semibold text-javeriana-blue dark:text-javeriana-gold-light">
            Nombre <span className="text-error">*</span>
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            value={form.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej: Carlos"
            className={`w-full rounded-input border bg-white px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 dark:bg-surface-dark-alt dark:text-white ${
              hasError('first_name')
                ? 'border-error focus:ring-error/40'
                : 'border-gray-200 focus:border-javeriana-gold focus:ring-javeriana-gold/40 dark:border-gray-700'
            }`}
          />
          {hasError('first_name') && (
            <p className="mt-1 text-xs text-error">{errors.first_name}</p>
          )}
        </div>

        {/* Apellido */}
        <div>
          <label htmlFor="last_name" className="mb-1.5 block text-sm font-semibold text-javeriana-blue dark:text-javeriana-gold-light">
            Apellido <span className="text-error">*</span>
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            value={form.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej: Rodríguez"
            className={`w-full rounded-input border bg-white px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 dark:bg-surface-dark-alt dark:text-white ${
              hasError('last_name')
                ? 'border-error focus:ring-error/40'
                : 'border-gray-200 focus:border-javeriana-gold focus:ring-javeriana-gold/40 dark:border-gray-700'
            }`}
          />
          {hasError('last_name') && (
            <p className="mt-1 text-xs text-error">{errors.last_name}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-javeriana-blue dark:text-javeriana-gold-light">
          Correo electrónico <span className="text-error">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="correo@ejemplo.com"
          className={`w-full rounded-input border bg-white px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 dark:bg-surface-dark-alt dark:text-white ${
            hasError('email')
              ? 'border-error focus:ring-error/40'
              : 'border-gray-200 focus:border-javeriana-gold focus:ring-javeriana-gold/40 dark:border-gray-700'
          }`}
        />
        {hasError('email') && (
          <p className="mt-1 text-xs text-error">{errors.email}</p>
        )}
        {emailHint && !hasError('email') && (
          <button
            type="button"
            onClick={applyEmailHint}
            className="mt-1 text-xs text-javeriana-gold-bright hover:underline"
          >
            💡 {emailHint}
          </button>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-javeriana-blue dark:text-javeriana-gold-light">
          Teléfono <span className="text-xs font-normal text-text-secondary dark:text-gray-400">(opcional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="+57 300 123 4567"
          className={`w-full rounded-input border bg-white px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 dark:bg-surface-dark-alt dark:text-white ${
            hasError('phone')
              ? 'border-error focus:ring-error/40'
              : 'border-gray-200 focus:border-javeriana-gold focus:ring-javeriana-gold/40 dark:border-gray-700'
          }`}
        />
        {hasError('phone') && (
          <p className="mt-1 text-xs text-error">{errors.phone}</p>
        )}
      </div>

      {/* Programa */}
      <div>
        <label htmlFor="program_id" className="mb-1.5 block text-sm font-semibold text-javeriana-blue dark:text-javeriana-gold-light">
          Programa de interés <span className="text-error">*</span>
        </label>
        <select
          id="program_id"
          name="program_id"
          required
          value={form.program_id}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full rounded-input border bg-white px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 dark:bg-surface-dark-alt dark:text-white ${
            hasError('program_id')
              ? 'border-error focus:ring-error/40'
              : 'border-gray-200 focus:border-javeriana-gold focus:ring-javeriana-gold/40 dark:border-gray-700'
          }`}
        >
          <option value="">Selecciona un programa</option>
          {allPrograms.map((program) => (
            <option key={program.id} value={program.id}>
              {program.name} — {program.category}
            </option>
          ))}
        </select>
        {hasError('program_id') && (
          <p className="mt-1 text-xs text-error">{errors.program_id}</p>
        )}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={submitting}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full rounded-capsule bg-javeriana-blue px-8 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-card transition-all hover:bg-javeriana-blue-light disabled:cursor-not-allowed disabled:opacity-60 dark:bg-javeriana-gold dark:text-javeriana-blue dark:hover:bg-javeriana-gold-light"
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Registrando...
          </span>
        ) : (
          'Registrar interés'
        )}
      </motion.button>

      <p className="text-center text-xs text-text-secondary dark:text-gray-400">
        Al registrarte aceptas que tus datos sean procesados para fines académicos informativos.
      </p>
    </form>
  );
}
