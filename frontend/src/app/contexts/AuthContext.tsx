"use client";

import React, { createContext, useContext, useState } from 'react';
import { loginAdmin } from '../lib/api';

interface AdminUser {
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem('admin_token');
  });
  const [user, setUser] = useState<AdminUser | null>(() => {
    if (typeof window === 'undefined') return null;
    const raw = sessionStorage.getItem('admin_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AdminUser;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const isAuthenticated = Boolean(token);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await loginAdmin(email, password);
      setToken(response.token);
      setUser(response.admin);
      sessionStorage.setItem('admin_token', response.token);
      sessionStorage.setItem('admin_user', JSON.stringify(response.admin));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}