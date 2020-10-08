import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FormSignUp from '../pages/SignUp';

const AppRoutes: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name="SignUp"
        component={FormSignUp}
        options={{ title: 'Cadastro' }}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
