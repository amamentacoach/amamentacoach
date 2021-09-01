import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import i18n from 'i18n-js';

import VideoPage from '../pages/Generic/VideoPage';

import createDiaryRoutes from './app/diary';
import createHomeRoutes from './app/home';
import createProfileRoutes from './app/profile';
import createSurveyRoutes from './app/survey';
import TabNavigator from './tabNavigator';

import BackIcon from '../../assets/images/icons/ic_back.svg';

const AppRoutes: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackImage: ({ tintColor }) => <BackIcon color={tintColor} />,
      }}>
      <Stack.Screen
        key="TabNavigator"
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      {createHomeRoutes(Stack)}
      {createDiaryRoutes(Stack)}
      {createSurveyRoutes(Stack)}
      {createProfileRoutes(Stack)}
      <Stack.Screen
        key="VideoPage"
        name="VideoPage"
        component={VideoPage}
        options={{ title: i18n.t('Video') }}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
