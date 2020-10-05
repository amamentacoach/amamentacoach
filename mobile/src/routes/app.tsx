import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignUp from '../pages/SignUp';
import FormMother from '../pages/FormMother';
import FormBaby from '../pages/FormBaby';

const AppRoutes: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        {/* <Stack.Screen
          name="Introducao"
          component={Introduction}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: 'Cadastro' }}
        />
        <Stack.Screen
          name="FormMother"
          component={FormMother}
          options={{ title: 'Cadastro' }}
        />
        <Stack.Screen
          name="FormBaby"
          component={FormBaby}
          options={{ title: 'Cadastro' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
