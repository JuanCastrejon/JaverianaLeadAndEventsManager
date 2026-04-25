import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import { ProgramProvider } from './context/ProgramContext';
import { LeadProvider } from './context/LeadContext';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ProgramProvider>
        <LeadProvider>
          <App />
        </LeadProvider>
      </ProgramProvider>
    </ThemeProvider>
  </StrictMode>,
);
