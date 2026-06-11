import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// 1. Tipagens do Estado e das Ações
interface FavoritesState {
  favoritesList: string[];
}

type FavoritesAction = 
  | { type: 'ADD_FAVORITE'; payload: string }
  | { type: 'REMOVE_FAVORITE'; payload: string };

const initialFavoritesState: FavoritesState = { favoritesList: [] };

// 2. O Reducer
function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'ADD_FAVORITE':
      // Evita adicionar o mesmo país duas vezes
      if (state.favoritesList.includes(action.payload)) return state;
      return { favoritesList: [...state.favoritesList, action.payload] };
    case 'REMOVE_FAVORITE':
      return { favoritesList: state.favoritesList.filter(name => name !== action.payload) };
    default:
      return state;
  }
}

// 3. Tipagem e Criação do Contexto
interface FavoritesContextProps {
  state: FavoritesState;
  addFavorite: (countryName: string) => void;
  removeFavorite: (countryName: string) => void;
  isFavorite: (countryName: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

// 4. O Provider que vai abraçar o app
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialFavoritesState);

  return (
    <FavoritesContext.Provider value={{
      state,
      addFavorite: (name) => dispatch({ type: 'ADD_FAVORITE', payload: name }),
      removeFavorite: (name) => dispatch({ type: 'REMOVE_FAVORITE', payload: name }),
      isFavorite: (name) => state.favoritesList.includes(name)
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 5. Hook customizado
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites deve ser usado dentro do FavoritesProvider');
  return context;
}