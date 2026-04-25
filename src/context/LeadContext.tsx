import { createContext, useReducer, useEffect, type ReactNode } from 'react';
import type { LeadState, LeadAction, Lead } from '../types';
import {
  getLeadsFromStorage,
  saveLeadsToStorage,
} from '../services/leadService';

const initialState: LeadState = {
  leads: [],
  loading: false,
  error: null,
};

function leadReducer(state: LeadState, action: LeadAction): LeadState {
  switch (action.type) {
    case 'SET_LEADS':
      return { ...state, leads: action.payload, loading: false };
    case 'ADD_LEAD':
      return {
        ...state,
        leads: [action.payload, ...state.leads],
      };
    case 'DELETE_LEAD':
      return {
        ...state,
        leads: state.leads.filter((lead) => lead.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

interface LeadContextValue {
  state: LeadState;
  dispatch: React.Dispatch<LeadAction>;
  addLead: (lead: Lead) => void;
  deleteLead: (id: string) => void;
}

export const LeadContext = createContext<LeadContextValue | null>(null);

interface LeadProviderProps {
  children: ReactNode;
}

export function LeadProvider({ children }: LeadProviderProps) {
  const [state, dispatch] = useReducer(leadReducer, initialState);

  // Cargar leads desde localStorage al montar
  useEffect(() => {
    const stored = getLeadsFromStorage();
    dispatch({ type: 'SET_LEADS', payload: stored });
  }, []);

  // Persistir leads en localStorage cuando cambian
  useEffect(() => {
    saveLeadsToStorage(state.leads);
  }, [state.leads]);

  function addLead(lead: Lead) {
    dispatch({ type: 'ADD_LEAD', payload: lead });
  }

  function deleteLead(id: string) {
    dispatch({ type: 'DELETE_LEAD', payload: id });
  }

  return (
    <LeadContext.Provider value={{ state, dispatch, addLead, deleteLead }}>
      {children}
    </LeadContext.Provider>
  );
}
