import { useState, useEffect, useMemo, useReducer } from 'react';

export interface Country {
  name?: { common: string; official?: string };
  cca2?: string;
  capital?: string[];
  region?: string;
  subregion?: string;
  population?: number;
  flags?: { png: string; svg: string };
  languages?: any;
  currencies?: any;
  area?: number;
  tld?: string[];

  'names.common'?: string;
  'names.official'?: string;
  capitals?: any[];
  'flag.url_png'?: string;
  'codes.alpha_2'?: string;

  [key: string]: any;
}

interface State {
  allCountries: Country[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Country[] }
  | { type: 'FETCH_ERROR'; payload: string };

const initialState: State = {
  allCountries: [],
  loading: true,
  error: null,
};

// Reducer limpo: agora ele só cuida da requisição da API
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, allCountries: action.payload, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// Dicionário de tradução dos chips
const continentMap: { [key: string]: string } = {
  'Américas': 'Americas',
  'Europa': 'Europe',
  'Ásia': 'Asia',
  'África': 'Africa',
  'Oceania': 'Oceania',
  'Todos': 'Todos'
};

export function useCountries() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchQuery, setSearch] = useState('');
  const [selectedContinent, setContinent] = useState('Todos');

  const fetchCountries = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const apiKey = process.env.EXPO_PUBLIC_REST_COUNTRIES_KEY;
      
      const fields = [
        'names.common',
        'names.official',
        'capitals',
        'region',
        'subregion',
        'population',
        'area.kilometers',
        'languages',
        'currencies',
        'flag.url_png',
        'codes.alpha_2'
      ].join(',');

      // Carimbo de tempo para burlar o cache e forçar a API a mandar os dados novos
      const url = `https://api.restcountries.com/countries/v5?limit=100&response_fields=${fields}&_nocache=${Date.now()}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const json = await response.json();

      if (json.data && Array.isArray(json.data.objects)) {
        let data = json.data.objects;
        
        // Blindagem Mágica: Padroniza todos os dados para não quebrar nenhuma tela
        data = data.map((country: any) => {
          const nameCommon = country['names.common'] || country.name?.common || country.names?.common || 'Desconhecido';
          const nameOfficial = country['names.official'] || country.name?.official || country.names?.official || nameCommon;
          const flagPng = country['flag.url_png'] || country.flags?.png || country.flag?.url_png || 'https://via.placeholder.com/150';
          const capitalStr = country.capitals?.[0]?.name || country.capitals?.[0] || country.capital?.[0] || 'N/A';

          return {
            ...country,
            'names.common': nameCommon,
            'names.official': nameOfficial,
            'flag.url_png': flagPng,
            name: { common: nameCommon, official: nameOfficial },
            flags: { png: flagPng, svg: flagPng },
            capital: [capitalStr],
            capitals: [capitalStr]
          };
        });

        data.sort((a: any, b: any) => a['names.common'].localeCompare(b['names.common']));
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } else {
        throw new Error('Formato de dados inválido recebido da API.');
      }
    } catch (err: any) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message || 'Erro ao carregar países' });
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Lógica de Filtro Nova: Segura e fora do reducer!
  const countries = useMemo(() => {
    return state.allCountries.filter(country => {
      // Usando a chave segura que mapeamos ali em cima
      const countryName = country['names.common'] || '';
      const matchesSearch = countryName.toLowerCase().includes(searchQuery.toLowerCase());

      const targetContinent = continentMap[selectedContinent] || selectedContinent;
      const matchesContinent = selectedContinent === 'Todos' || 
        (country.region && country.region.toLowerCase() === targetContinent.toLowerCase());

      return matchesSearch && matchesContinent;
    });
  }, [state.allCountries, searchQuery, selectedContinent]);

  return {
    allCountries: state.allCountries,
    countries,
    loading: state.loading,
    error: state.error,
    refetch: fetchCountries,
    searchQuery,
    setSearch,
    selectedContinent,
    setContinent,
  };
}