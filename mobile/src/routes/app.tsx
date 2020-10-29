import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './tabNavigator';
import NewPassword from '../pages/NewPassword';

const AppRoutes: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{ title: 'Alterar senha' }}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
