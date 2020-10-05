import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Introduction from '../pages/Introduction';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import FormMother from '../pages/FormMother';
import FormBaby from '../pages/FormBaby';

const AuthRoutes: React.FC = () => {
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
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          options={{ title: 'Cadastro' }}
          component={SignUp}
        />
        <Stack.Screen
          name="FormMother"
          options={{ title: 'Cadastro' }}
          component={FormMother}
        />
        <Stack.Screen
          name="FormBaby"
          options={{ title: 'Cadastro' }}
          component={FormBaby}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthRoutes;
