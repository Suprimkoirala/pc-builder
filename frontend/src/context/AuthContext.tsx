import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthResponse, LoginRequest, RegisterRequest } from '../types';
import { authAPI } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authAPI.getCurrentUser();
        setUser(userData);
      }
    } catch (error: any) {
      // Don't remove tokens on network errors, only on auth errors
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginRequest) => {
    try {
      const response: AuthResponse = await authAPI.login(data);
      localStorage.setItem('token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response: AuthResponse = await authAPI.register(data);
      localStorage.setItem('token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      authAPI.logout(refreshToken).catch(() => {});
    }
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
