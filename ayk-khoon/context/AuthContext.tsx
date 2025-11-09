import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { dummyUser } from '../utils/dummyData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: false,
  });

  const login = async (email: string, password: string) => {
    setAuthState({ ...authState, isLoading: true });
    setTimeout(() => {
      setAuthState({
        isAuthenticated: true,
        user: { ...dummyUser, email },
        isLoading: false,
      });
    }, 500);
  };

  const signup = async (email: string, password: string) => {
    setAuthState({ ...authState, isLoading: true });
    setTimeout(() => {
      setAuthState({
        isAuthenticated: true,
        user: { ...dummyUser, email, name: '', phone: '', bloodGroup: 'O+', mode: 'user' },
        isLoading: false,
      });
    }, 500);
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (authState.user) {
      setAuthState({
        ...authState,
        user: { ...authState.user, ...userData },
      });
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
