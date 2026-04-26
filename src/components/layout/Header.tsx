import { motion } from 'framer-motion';
import { Lock, Globe, Mail, Heart, Zap, ExternalLink, Layers } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
}

interface HeaderProps {
  navItems: ReadonlyArray<NavItem>;
  isDark: boolean;
  onToggleTheme: () => void;
}

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M12 1.75v2.5M12 19.75v2.5M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M1.75 12h2.5M19.75 12h2.5M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77M12 17.25A5.25 5.25 0 1 0 12 6.75a5.25 5.25 0 0 0 0 10.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M20.5 14.4A8.4 8.4 0 0 1 9.6 3.5a7.9 7.9 0 1 0 10.9 10.9Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function Header({ navItems, isDark, onToggleTheme }: HeaderProps) {
  const quickLinks = [
    { label: 'Intranet', href: 'https://intranet.javeriana.edu.co/inicio', Icon: Lock },
    { label: 'Campus Virtual', href: 'https://campusvirtual.javeriana.edu.co/', Icon: Globe },
    { label: 'Mi correo', href: 'https://mail.office365.com/javeriana.edu.co', Icon: Mail },
    { label: 'Donaciones', href: 'https://www.javeriana.edu.co/donaciones', Icon: Heart },
    { label: 'Apoyo financiero', href: 'https://www.javeriana.edu.co/estudia-en-la-javeriana/apoyo-financiero', Icon: Zap },
    { label: 'Servicios externos', href: 'https://www.javeriana.edu.co/servicios-en-linea', Icon: ExternalLink },
    { label: 'Perfiles y Capacidades', href: 'https://www.javeriana.edu.co/biblos/perfiles', Icon: Layers },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-header dark:border-gray-800 dark:bg-surface-dark">
      <div className="hidden bg-javeriana-blue py-2 text-[11px] text-white lg:block">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {quickLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -1, opacity: 0.95 }}
                className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
              >
                <link.Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">{link.label}</span>
              </motion.a>
            ))}
          </div>
          <div className="flex items-center gap-4 text-white/90">
            <span>Tel (+57) 601 320 8320</span>
            <span>|</span>
            <span>Cra 7 No 40 - 62</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:py-3">
        <a href="#hero" className="flex items-center gap-3">
          <img
            src="/assets/logo/Logo-PUJ-Bogota-90.svg"
            alt="Pontificia Universidad Javeriana"
            className="h-12 w-auto shrink-0 object-contain"
          />
          <div className="hidden sm:block">
            <p className="font-family-display text-lg font-bold text-javeriana-blue dark:text-javeriana-gold-light">
              Javeriana Lead Manager
            </p>
            <p className="text-xs text-text-secondary dark:text-gray-400">Dirección de Mercadeo</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-javeriana-blue transition-colors hover:bg-javeriana-blue/5 hover:text-javeriana-blue-light dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {item.label}
            </motion.a>
          ))}
          <motion.a
            href="#programs"
            whileHover={{ y: -1, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="ml-2 rounded-lg bg-[#F8CD00] px-4 py-2 text-sm font-bold text-javeriana-blue transition-colors hover:bg-javeriana-blue hover:text-white"
          >
            Estudia en la Javeriana
          </motion.a>
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            id="theme-toggle"
            type="button"
            role="switch"
            aria-checked={isDark}
            onClick={onToggleTheme}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex h-10 w-20 items-center rounded-full border border-javeriana-gold/40 bg-surface-alt transition-colors hover:bg-javeriana-gold/10 dark:border-javeriana-gold/30 dark:bg-surface-dark-alt"
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            <span className="pointer-events-none absolute left-2 text-javeriana-gold-bright dark:text-javeriana-gold-light">
              <SunIcon />
            </span>
            <span className="pointer-events-none absolute right-2 text-javeriana-blue dark:text-gray-200">
              <MoonIcon />
            </span>
            <span
              className={`absolute top-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-javeriana-blue text-white shadow-card transition-all duration-300 dark:bg-javeriana-gold dark:text-javeriana-blue ${
                isDark ? 'translate-x-11' : 'translate-x-1'
              }`}
            >
              {isDark ? <MoonIcon /> : <SunIcon />}
            </span>
            <span className="sr-only">Alternar tema</span>
          </motion.button>
        </div>
      </div>

      <div className="border-t border-javeriana-gold/20 px-4 py-2 lg:hidden">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full bg-javeriana-blue/5 px-3 py-1 text-xs font-semibold text-javeriana-blue dark:bg-javeriana-gold/10 dark:text-javeriana-gold-light"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
