import React, { createContext, useContext, useState, useEffect } from 'react';
import { isLogged } from '../controller/miApp.controller';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUserLoginStatus = async () => {
    try {
      const response = await isLogged();
      if (response && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking user login status:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserLoginStatus();
  }, []);

  const refreshUser = () => {
    setLoading(true);
    checkUserLoginStatus();
  };

  const setUserData = (userData) => {
    setUser(userData);
  };

  const clearUser = () => {
    setUser(null);
  };

  const value = {
    user,
    setUser: setUserData,
    loading,
    refreshUser,
    clearUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
