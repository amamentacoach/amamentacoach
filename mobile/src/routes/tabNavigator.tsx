import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../pages/Home/Menu';
import DiaryMenu from '../pages/Diary/Menu';
import SurveyMenu from '../pages/Survey/Menu';
import Profile from '../pages/Profile/Menu';

import homeIcon from '../../assets/images/icons/ic_home_grey.png';
import diaryIcon from '../../assets/images/icons/ic_diary_grey.png';
import surveyIcon from '../../assets/images/icons/ic_survey_grey.png';
import profileIcon from '../../assets/images/icons/ic_profile_grey.png';
import { useIsFirstRun } from '../contexts/firstRun';
import DiaryIntroduction from '../pages/Diary/DiaryIntroduction';

const TabNavigator: React.FC = () => {
  const { isFirstRun } = useIsFirstRun();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#7D5CD7',
        inactiveTintColor: '#545454',
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
        component={isFirstRun.diary ? DiaryIntroduction : DiaryMenu}
        options={{
          tabBarLabel: 'Diário',
          tabBarVisible: !isFirstRun.diary,
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
        component={SurveyMenu}
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

export default TabNavigator;
