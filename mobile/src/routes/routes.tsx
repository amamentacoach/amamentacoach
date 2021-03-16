import React from 'react';

import { useAuth } from '../contexts/auth';
import AuthRoutes from './auth';
import AppRoutes from './app';

const Routes: React.FC = () => {
  const { isSigned } = useAuth();
  return isSigned ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
