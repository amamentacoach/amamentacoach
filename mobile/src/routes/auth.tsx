import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import MotherForm from '../pages/MotherForm';
import BabyForm from '../pages/BabyForm';

const AuthRoutes: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      {/* <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="SignUp"
        options={{ title: 'Cadastro' }}
        component={SignUp}
      />
      <Stack.Screen
        name="MotherForm"
        options={{ title: 'Cadastro' }}
        component={MotherForm}
      />
      <Stack.Screen
        name="BabyForm"
        options={{ title: 'Cadastro' }}
        component={BabyForm}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
