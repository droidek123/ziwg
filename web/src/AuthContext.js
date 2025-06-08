import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUserId(decoded.userId);
        setToken(storedToken);
      } catch (error) {
        console.error('Błąd dekodowania tokena:', error);
        logout(); // jeśli token nieprawidłowy
      }
    }
  }, []);

  const login = (newToken) => {
    try {
      const decoded = jwtDecode(newToken);
      localStorage.setItem('jwtToken', newToken);
      setUserId(decoded.userId);
      setToken(newToken);
    } catch (error) {
      console.error('Błąd dekodowania tokena podczas logowania:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUserId(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};