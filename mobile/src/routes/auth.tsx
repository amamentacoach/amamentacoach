import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { useIsFirstRun } from '../contexts/firstRun';
import TermsOfService from '../pages/Auth/AcceptTermsOfService';
import BabyForm from '../pages/Auth/BabyForm';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Introduction from '../pages/Auth/Introduction';
import Login from '../pages/Auth/Login';
import MotherForm from '../pages/Auth/MotherForm';
import SignUp from '../pages/Auth/SignUp';

const AuthRoutes: React.FC = () => {
  const Stack = createStackNavigator();
  const { isFirstRun } = useIsFirstRun();

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      {isFirstRun.persistent.appIntroduction && (
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
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfService}
        options={{ title: 'Termo de Consentimento' }}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
