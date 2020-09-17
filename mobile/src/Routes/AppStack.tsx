import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Introduction from '../pages/Introduction';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Introducao"
          component={Introduction}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Cadastro" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
