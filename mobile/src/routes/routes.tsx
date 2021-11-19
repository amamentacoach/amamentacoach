import { useAuth } from 'contexts/auth';
import AppRoutes from 'routes/app';
import AuthRoutes from 'routes/auth';

const Routes: React.FC = () => {
  const { isSigned } = useAuth();
  return isSigned ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
