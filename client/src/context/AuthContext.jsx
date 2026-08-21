import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('garvit_portfolio_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await api.verifyToken();
      if (res.success) {
        setUser(res.user);
      } else {
        logout();
      }
    } catch (err) {
      console.warn('Session expired or invalid token');
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (emailOrUsername, password) => {
    const res = await api.login({ emailOrUsername, password });
    if (res.success && res.token) {
      localStorage.setItem('garvit_portfolio_token', res.token);
      setUser(res.user);
      return res.user;
    }
    throw new Error(res.error || 'Authentication failed');
  };

  const logout = () => {
    localStorage.removeItem('garvit_portfolio_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
