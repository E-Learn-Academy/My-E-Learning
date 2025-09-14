
import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService'; 

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userDataString = localStorage.getItem('user');

      
      if (token && userDataString && userDataString !== 'undefined' && userDataString !== 'null') {
        const userData = JSON.parse(userDataString);
        setUser(userData);
      }

    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    const { token, user } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user)); 
    
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const authContextValue = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
