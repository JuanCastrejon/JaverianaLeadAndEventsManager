import { useTheme } from './hooks/useTheme';

export function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark transition-colors duration-300">
      {/* Header placeholder */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md shadow-header border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-javeriana-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-javeriana-blue dark:text-javeriana-gold font-[family-name:var(--font-family-display)]">
                Javeriana Lead Manager
              </h1>
              <p className="text-xs text-text-secondary dark:text-gray-400">
                Dirección de Mercadeo
              </p>
            </div>
          </div>

          <button
            id="theme-toggle"
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-surface-alt dark:bg-surface-dark-alt hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main content placeholder */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center py-16">
          <h2 className="text-4xl font-bold text-javeriana-blue dark:text-white font-[family-name:var(--font-family-display)] mb-4">
            Bienvenido al <span className="text-javeriana-gold">Lead Manager</span>
          </h2>
          <p className="text-lg text-text-secondary dark:text-gray-300 max-w-2xl mx-auto">
            Gestiona los prospectos académicos de la Pontificia Universidad Javeriana.
            Visualiza programas, registra interesados y analiza métricas.
          </p>
          <div className="mt-8 w-24 h-1 bg-javeriana-gold mx-auto rounded-full" />
        </section>

        {/* Secciones por implementar en Fase 2-3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {['Programas Académicos', 'Registro de Leads', 'Estadísticas'].map(
            (title) => (
              <div
                key={title}
                className="p-6 rounded-card bg-white dark:bg-surface-dark-alt shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-gray-100 dark:border-gray-800"
              >
                <h3 className="text-lg font-semibold text-javeriana-blue dark:text-javeriana-gold-light mb-2">
                  {title}
                </h3>
                <p className="text-sm text-text-secondary dark:text-gray-400">
                  Módulo en construcción — siguiente fase de implementación.
                </p>
              </div>
            ),
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-javeriana-blue text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm opacity-80">
            © 2026 Pontificia Universidad Javeriana — Dirección de Mercadeo
          </p>
          <p className="text-xs opacity-60 mt-1">
            Prueba Técnica — Desarrollador Frontend
          </p>
        </div>
      </footer>
    </div>
  );
}
