import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../pages/Main';

const AppRoutes: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen name="Main" component={Main} options={{ title: 'Menu' }} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
