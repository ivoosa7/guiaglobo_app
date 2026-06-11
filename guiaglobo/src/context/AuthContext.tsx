import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// 1. Tipagens do Estado e das Ações
interface AuthState {
  isAuthenticated: boolean;
  userEmail: string | null;
}

type AuthAction = 
  | { type: 'LOGIN'; payload: string }
  | { type: 'LOGOUT' };

const initialAuthState: AuthState = { isAuthenticated: false, userEmail: null };

// 2. O Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, userEmail: action.payload };
    case 'LOGOUT':
      return { isAuthenticated: false, userEmail: null };
    default:
      return state;
  }
}

// 3. Tipagem e Criação do Contexto
interface AuthContextProps {
  state: AuthState;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// 4. O Provider que vai abraçar o app
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{
      state,
      login: (email) => dispatch({ type: 'LOGIN', payload: email }),
      logout: () => dispatch({ type: 'LOGOUT' })
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. Hook customizado
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro do AuthProvider');
  return context;
}