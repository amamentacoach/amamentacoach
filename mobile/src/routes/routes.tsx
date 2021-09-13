import { useAuth } from 'contexts/auth';

import AppRoutes from './app';
import AuthRoutes from './auth';

const Routes: React.FC = () => {
  const { isSigned } = useAuth();
  return isSigned ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
