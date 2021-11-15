import React, { useContext } from 'react';

import SignRoutes from './SignRoute';
import OtherRoutes from './OtherRoutes';
import { useAuth } from '../Contexts/auth';

const Routes: React.FC = () => {
  const { signed } = useAuth();

  return signed ? <OtherRoutes /> : <SignRoutes />;
};

export default Routes;