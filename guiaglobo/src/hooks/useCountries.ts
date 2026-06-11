import { useEffect, useReducer } from 'react';

// Tipagem exportada para ser usada nos outros arquivos
export interface Country {
  name: { common: string; official: string };
  cca2: string; 
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  flags: { png: string; svg: string };
  languages?: { [key: string]: string };
  currencies?: { [key: string]: { name: string; symbol: string } };
  area: number;
  tld?: string[];
}

interface State {
  countries: Country[];
  filteredCountries: Country[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedContinent: string;
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Country[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_CONTINENT'; payload: string };

const initialState: State = {
  countries: [],
  filteredCountries: [],
  loading: true,
  error: null,
  searchQuery: '',
  selectedContinent: 'Todos',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
      
    case 'FETCH_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        countries: action.payload, 
        filteredCountries: action.payload 
      };
      
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
      
    case 'SET_SEARCH': {
      const search = action.payload.toLowerCase();
      const filtered = state.countries.filter(c => {
        const matchesSearch = c.name.common.toLowerCase().includes(search);
        const matchesContinent = state.selectedContinent === 'Todos' || c.region === state.selectedContinent;
        return matchesSearch && matchesContinent;
      });
      return { ...state, searchQuery: action.payload, filteredCountries: filtered };
    }
    
    case 'SET_CONTINENT': {
      const continent = action.payload;
      const mapContinentToRegion = (cont: string) => {
        if (cont === 'Américas') return 'Americas';
        if (cont === 'Europa') return 'Europe';
        if (cont === 'Ásia') return 'Asia';
        if (cont === 'África') return 'Africa';
        if (cont === 'Oceania') return 'Oceania';
        return 'Todos';
      };
      
      const region = mapContinentToRegion(continent);
      const filtered = state.countries.filter(c => {
        const matchesSearch = c.name.common.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesContinent = region === 'Todos' || c.region === region;
        return matchesSearch && matchesContinent;
      });
      return { ...state, selectedContinent: continent, filteredCountries: filtered };
    }
    
    default:
      return state;
  }
}

export function useCountries() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCountries = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) throw new Error('Falha ao buscar os dados da API.');
      
      const data: Country[] = await response.json();
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));

      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err: any) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message || 'Erro de conexão' });
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return {
    countries: state.filteredCountries,
    allCountries: state.countries, // Exportado para os outros hooks usarem a lista completa sem filtros
    loading: state.loading,
    error: state.error,
    searchQuery: state.searchQuery,
    selectedContinent: state.selectedContinent,
    setSearch: (query: string) => dispatch({ type: 'SET_SEARCH', payload: query }),
    setContinent: (continent: string) => dispatch({ type: 'SET_CONTINENT', payload: continent }),
    refetch: fetchCountries,
  };
}