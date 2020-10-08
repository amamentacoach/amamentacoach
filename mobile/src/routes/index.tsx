import React, { useContext } from 'react';

import AuthRoutes from './auth';
import AppRoutes from './app';
import AuthContext from '../contexts/auth';

const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext);
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
