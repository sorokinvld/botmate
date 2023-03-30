import { useContext } from 'react';
import { authContext } from '../../contexts/auth';

export const useAuth = () => {
  return useContext(authContext);
};
