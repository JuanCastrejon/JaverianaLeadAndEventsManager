import { Component, type ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary que atrapa errores de React y evita que el app se bloquee.
 * Muestra un mensaje amigable al usuario mientras mantiene el resto de la app funcional.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    console.error('[ErrorBoundary] Error capturado:', error);
    console.error('[ErrorBoundary] Stack:', errorInfo.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-surface p-4 dark:bg-surface-dark">
          <div className="max-w-md rounded-card border border-red-200 bg-red-50 p-6 shadow-card dark:border-red-900/60 dark:bg-red-950/30">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
              <div className="min-w-0">
                <h2 className="font-semibold text-red-700 dark:text-red-300">
                  Algo salió mal
                </h2>
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {this.state.error?.message || 'Error desconocido'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    this.handleReset();
                    window.location.href = '/';
                  }}
                  className="mt-4 inline-flex items-center rounded-full border border-red-300 bg-red-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-red-700 transition hover:bg-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-900/50"
                >
                  Recargar página
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
