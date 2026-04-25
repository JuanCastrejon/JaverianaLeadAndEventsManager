import { useContext } from 'react';
import { ProgramContext } from '../context/ProgramContext';

export function usePrograms() {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error('usePrograms debe usarse dentro de un ProgramProvider');
  }

  const { state, dispatch } = context;

  function setSearchQuery(query: string) {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }

  function setCategory(category: string) {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  }

  return {
    programs: state.filteredPrograms,
    allPrograms: state.programs,
    searchQuery: state.searchQuery,
    selectedCategory: state.selectedCategory,
    loading: state.loading,
    error: state.error,
    setSearchQuery,
    setCategory,
  };
}
