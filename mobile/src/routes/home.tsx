import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../pages/Home';
import Diary from '../pages/Diary';
import Survey from '../pages/Survey';
import Profile from '../pages/Profile';

import homeIcon from '../../assets/images/icons/ic_home_grey.png';
import diaryIcon from '../../assets/images/icons/ic_diary_grey.png';
import surveyIcon from '../../assets/images/icons/ic_survey_grey.png';
import profileIcon from '../../assets/images/icons/ic_profile_grey.png';

const HomeRoutes: React.FC = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#7D5CD7',
        inactiveTintColor: '#545454',
        style: {
          paddingBottom: 6,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => {
            return (
              <Image
                source={homeIcon}
                height={size}
                width={size}
                style={{ tintColor: color }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Diary"
        component={Diary}
        options={{
          tabBarLabel: 'Diário',
          tabBarIcon: ({ color, size }) => {
            return (
              <Image
                source={diaryIcon}
                height={size}
                width={size}
                style={{ tintColor: color }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Survey"
        component={Survey}
        options={{
          tabBarLabel: 'Enquetes',
          tabBarIcon: ({ color, size }) => {
            return (
              <Image
                source={surveyIcon}
                height={size}
                width={size}
                style={{ tintColor: color }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => {
            return (
              <Image
                source={profileIcon}
                height={size}
                width={size}
                style={{ tintColor: color }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeRoutes;
