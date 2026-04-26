import { useCallback, useContext } from 'react';
import { ProgramContext } from '../context/ProgramContext';

export function usePrograms() {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error('usePrograms debe usarse dentro de un ProgramProvider');
  }

  const { state, dispatch, reloadPrograms } = context;

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }, [dispatch]);

  const setCategory = useCallback((category: string) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  }, [dispatch]);

  return {
    programs: state.filteredPrograms,
    allPrograms: state.programs,
    searchQuery: state.searchQuery,
    selectedCategory: state.selectedCategory,
    loading: state.loading,
    error: state.error,
    reloadPrograms,
    setSearchQuery,
    setCategory,
  };
}
