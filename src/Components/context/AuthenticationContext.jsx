import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService.js'; 

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
        console.log('User loaded from localStorage:', userData);
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
    console.log('Full API Response:', response.data);
    
    const { token } = response.data;
    
   
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    console.log('Token payload:', tokenPayload);
    
    const userData = {
      id: tokenPayload._id,
      email: tokenPayload.email,
      fullName: email.split('@')[0], 
    };
    
    console.log('Final userData:', userData);
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData)); 
    
    setUser(userData);
    console.log('User logged in:', userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    console.log('User logged out');
  };

 

  const authContextValue = {
  user,
  token: localStorage.getItem('token'), //////////
  isAuthenticated: !!user,
  login,
  logout,
  loading,
};


  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};