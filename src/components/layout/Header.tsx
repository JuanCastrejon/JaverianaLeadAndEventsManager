import type { ThemeMode } from '../../types';

interface NavItem {
  id: string;
  label: string;
}

interface HeaderProps {
  navItems: ReadonlyArray<NavItem>;
  mode: ThemeMode;
  onToggleTheme: () => void;
}

export function Header({ navItems, mode, onToggleTheme }: HeaderProps) {
  const quickLinks = [
    { label: 'Intranet', href: 'https://intranet.javeriana.edu.co/inicio' },
    { label: 'Campus Virtual', href: 'https://campusvirtual.javeriana.edu.co/' },
    { label: 'Mi correo', href: 'https://mail.office365.com/javeriana.edu.co' },
    { label: 'Servicios externos', href: 'https://www.javeriana.edu.co/servicios-en-linea' },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-header dark:border-gray-800 dark:bg-surface-dark">
      <div className="hidden bg-javeriana-blue py-2 text-[11px] text-white lg:block">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4 text-white/90">
            <span>Tel (+57) 601 320 8320</span>
            <span>|</span>
            <span>Cra 7 No 40 - 62</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:py-3 lg:px-8">
        <a href="#hero" className="flex items-center gap-3">
          <img
            src="/assets/logo/Logo-PUJ-Bogota-90.svg"
            alt="Pontificia Universidad Javeriana"
            className="h-12 w-auto shrink-0 object-contain"
          />
          <div className="hidden sm:block">
            <p className="font-[family-name:var(--font-family-display)] text-lg font-bold text-javeriana-blue dark:text-javeriana-gold-light">
              Javeriana Lead Manager
            </p>
            <p className="text-xs text-text-secondary dark:text-gray-400">Dirección de Mercadeo</p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-md px-3 py-2 text-sm font-semibold text-javeriana-blue transition-colors hover:bg-javeriana-blue/5 hover:text-javeriana-blue-light dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#programs"
            className="ml-2 rounded-lg bg-[#F8CD00] px-4 py-2 text-sm font-bold text-javeriana-blue transition-colors hover:bg-javeriana-blue hover:text-white"
          >
            Estudia en la Javeriana
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            id="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            className="rounded-full border border-javeriana-gold/40 bg-surface-alt px-4 py-2 text-sm font-semibold text-javeriana-blue transition-colors hover:bg-javeriana-gold/15 dark:border-javeriana-gold/30 dark:bg-surface-dark-alt dark:text-javeriana-gold-light dark:hover:bg-javeriana-gold/10"
            aria-label={mode === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {mode === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-javeriana-blue/20 text-javeriana-blue hover:bg-javeriana-blue/5 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            aria-label="Buscar"
          >
            🔍
          </button>
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
