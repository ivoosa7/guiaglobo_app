import React, { createContext, useReducer, ReactNode, useContext } from 'react';

// 1. Definindo as paletas de cores (O meu critério visual para o seu app)
export const lightTheme = {
  background: '#F8F9FA', // Fundo cinza bem claro
  cardBackground: '#FFFFFF', // Cartões brancos
  textPrimary: '#212529', // Texto quase preto
  textSecondary: '#6C757D', // Texto cinza para detalhes
  primary: '#007BFF', // Azul vibrante para botões e destaques
  border: '#DEE2E6', // Bordas suaves
};

export const darkTheme = {
  background: '#121212', // Fundo escuro padrão de apps
  cardBackground: '#1E1E1E', // Cartões levemente mais claros que o fundo
  textPrimary: '#F8F9FA', // Texto quase branco
  textSecondary: '#ADB5BD', // Texto cinza claro para detalhes
  primary: '#339AF0', // Azul um pouco mais claro para contrastar no escuro
  border: '#2B2B2B', // Bordas escuras
};

export type Theme = typeof lightTheme;

// 2. Configurando o estado inicial e o Reducer (Requisito do trabalho!)
interface ThemeState {
  isDark: boolean;
  colors: Theme;
}

type ThemeAction = { type: 'TOGGLE_THEME' };

const initialState: ThemeState = {
  isDark: false,
  colors: lightTheme,
};

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'TOGGLE_THEME':
      const newIsDark = !state.isDark;
      return {
        isDark: newIsDark,
        colors: newIsDark ? darkTheme : lightTheme,
      };
    default:
      return state;
  }
}

// 3. Criando o Contexto
interface ThemeContextProps {
  state: ThemeState;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// 4. Criando o Provider para abraçar o app
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' });

  return (
    <ThemeContext.Provider value={{ state, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 5. Hook customizado para facilitar o uso nas telas
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
}