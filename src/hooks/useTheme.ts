import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  }

  return {
    mode: context.state.mode,
    resolved: context.state.resolved,
    isDark: context.state.resolved === 'dark',
    setThemeMode: context.setThemeMode,
    toggleTheme: context.toggleTheme,
  };
}
