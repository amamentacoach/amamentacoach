import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import AuthRoutes from './auth';
import AppRoutes from './app';
import { useAuth } from '../contexts/auth';
import Introduction from '../pages/Introduction';
import { useIsFirstRun } from '../contexts/firstRun';

const Routes: React.FC = () => {
  const Stack = createStackNavigator();
  const { signed } = useAuth();
  const { isFirstRun } = useIsFirstRun();

  if (isFirstRun) {
    return (
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen
          name="Introduction"
          component={Introduction}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
