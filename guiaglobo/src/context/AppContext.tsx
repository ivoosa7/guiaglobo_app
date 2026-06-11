import React, { ReactNode } from 'react';

// Importamos os providers individuais que acabamos de criar
import { ThemeProvider } from './ThemeContext';
import { FavoritesProvider } from './FavoritesContext';
import { AuthProvider } from './AuthContext';

interface AppProviderProps {
  children: ReactNode;
}

// Criamos um "Super Provider" que empilha todos eles
export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

// (Opcional) Reexportar os hooks aqui também facilita a importação nas telas!
// Assim você pode importar tudo de um lugar só: import { useTheme, useAuth } from '../context/AppContext'
export { useTheme } from './ThemeContext';
export { useFavorites } from './FavoritesContext';
export { useAuth } from './AuthContext';