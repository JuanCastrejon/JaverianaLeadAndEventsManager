import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { ProgramProvider } from './context/ProgramContext';
import { EventProvider } from './context/EventContext';
import { LeadProvider } from './context/LeadContext';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <ProgramProvider>
          <EventProvider>
            <LeadProvider>
              <App />
            </LeadProvider>
          </EventProvider>
        </ProgramProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);
