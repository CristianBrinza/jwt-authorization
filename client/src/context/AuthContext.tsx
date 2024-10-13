import React, { createContext, useState, useEffect } from 'react';
import { login as loginUser, register as registerUser } from '../services/authService';

interface AuthContextProps {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userData && token) {
      setUser(JSON.parse(userData));
    }
  }, []);

  /**
   * Login user and set context state
   */
  const login = async (email: string, password: string) => {
    try {
      const res = await loginUser({ email, password });
      setUser(res.user);
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('token', res.token);
    } catch (err) {
      throw err;
    }
  };

  /**
   * Register new user and set context state
   */
  const register = async (data: any) => {
    try {
      const res = await registerUser(data);
      setUser(res.user);
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('token', res.token);
    } catch (err) {
      throw err;
    }
  };

  /**
   * Logout user and clear context state
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
      <AuthContext.Provider value={{ user, login, register, logout }}>
        {children}
      </AuthContext.Provider>
  );
};
