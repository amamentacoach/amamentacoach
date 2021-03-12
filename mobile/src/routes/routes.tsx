import React from 'react';

import { useAuth } from '../contexts/auth';
import AuthRoutes from './auth';
import AppRoutes from './app';

const Routes: React.FC = () => {
  const { isSigned } = useAuth();

  // TODO Remover
  // return isSigned ? <AppRoutes /> : <AuthRoutes />;
  return <AppRoutes />;
};

export default Routes;
