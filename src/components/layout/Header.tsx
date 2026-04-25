import type { ThemeMode } from '../../types';

interface NavItem {
  id: string;
  label: string;
}

interface HeaderProps {
  navItems: NavItem[];
  mode: ThemeMode;
  onToggleTheme: () => void;
}

export function Header({ navItems, mode, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 shadow-header backdrop-blur-md dark:border-gray-800 dark:bg-surface-dark/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#hero" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-javeriana-blue text-white">
            <span className="font-bold">J</span>
          </div>
          <div>
            <p className="font-[family-name:var(--font-family-display)] text-lg font-bold text-javeriana-blue dark:text-javeriana-gold-light">
              Javeriana Lead Manager
            </p>
            <p className="text-xs text-text-secondary dark:text-gray-400">Mercadeo PUJ</p>
          </div>
        </a>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-sm font-semibold text-javeriana-blue transition-colors hover:text-javeriana-gold dark:text-gray-200 dark:hover:text-javeriana-gold-bright"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          id="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          className="rounded-full border border-javeriana-gold/40 bg-surface-alt px-4 py-2 text-sm font-semibold text-javeriana-blue transition-colors hover:bg-javeriana-gold/15 dark:border-javeriana-gold/30 dark:bg-surface-dark-alt dark:text-javeriana-gold-light dark:hover:bg-javeriana-gold/10"
          aria-label={mode === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
        >
          {mode === 'dark' ? 'Modo claro' : 'Modo oscuro'}
        </button>
      </div>

      <div className="border-t border-javeriana-gold/20 px-4 py-2 md:hidden">
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
