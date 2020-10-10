import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../contexts/auth';
import { useIsFirstRun } from '../contexts/firstRun';
import AuthRoutes from './auth';
import AppRoutes from './app';
import Introduction from '../pages/Introduction';
import SplashScreen from '../pages/SplashScreen';

const Routes: React.FC = () => {
  const Stack = createStackNavigator();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const { isFirstRun } = useIsFirstRun();
  const { isSigned } = useAuth();

  setTimeout(() => {
    setShowSplashScreen(false);
  }, 1000);

  // Exibe a tela de introdução se é a primeira vez do usuário rodando o aplicativo e a splash já
  // terminou.
  if (isFirstRun && !showSplashScreen) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Introduction"
          component={Introduction}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  // Exibe as telas principais do app se o usuário está logado e a splash já terminou.
  if (isSigned && !showSplashScreen) {
    return <AppRoutes />;
  }

  // Exibe as telas de autenticação do app se o usuário não está logado e a splash já terminou.
  if (!isSigned && !showSplashScreen) {
    return <AuthRoutes />;
  }

  return <SplashScreen />;
};

export default Routes;
