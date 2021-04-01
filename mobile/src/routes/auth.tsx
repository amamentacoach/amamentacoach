import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useIsFirstRun } from '../contexts/firstRun';
import Login from '../pages/Auth/Login';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import SignUp from '../pages/Auth/SignUp';
import MotherForm from '../pages/Auth/MotherForm';
import BabyForm from '../pages/Auth/BabyForm';
import Introduction from '../pages/Auth/Introduction';

const AuthRoutes: React.FC = () => {
  const Stack = createStackNavigator();
  const { isFirstRun } = useIsFirstRun();

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      {isFirstRun.introduction && (
        <Stack.Screen
          name="Introduction"
          component={Introduction}
          options={{ headerShown: false }}
        />
      )}

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ title: 'Esqueceu a senha?' }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: 'Cadastro' }}
      />
      <Stack.Screen
        name="MotherForm"
        component={MotherForm}
        options={{ title: 'Cadastro' }}
      />
      <Stack.Screen
        name="BabyForm"
        component={BabyForm}
        options={{ title: 'Cadastro' }}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
