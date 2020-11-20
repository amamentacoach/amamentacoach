import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useIsFirstRun } from '../contexts/firstRun';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import MotherForm from '../pages/MotherForm';
import BabyForm from '../pages/BabyForm';
import Introduction from '../pages/Introduction';

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
