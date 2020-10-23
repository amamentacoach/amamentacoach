import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeRoutes from './home';
import NewPassword from '../pages/NewPassword';

const AppRoutes: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{ title: 'Esqueceu a senha?' }}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
