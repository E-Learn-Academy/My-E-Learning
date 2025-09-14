import { useContext } from 'react';
import { AuthContext } from '../context/AuthenticationContext.jsx';

export const useAuth = () => {
  return useContext(AuthContext);
};
