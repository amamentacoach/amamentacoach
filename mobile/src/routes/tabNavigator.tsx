import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useIsFirstRun } from '../contexts/firstRun';
import DiaryIntroduction from '../pages/Diary/DiaryIntroduction';
import DiaryMenu from '../pages/Diary/Menu';
import HomeMenu from '../pages/Home/Menu';
import ProfileMenu from '../pages/Profile/Menu';
import SurveyMenu from '../pages/Survey/Menu';

import DiaryIcon from '../../assets/images/icons/ic_diary_grey.svg';
import HomeIcon from '../../assets/images/icons/ic_home_grey.svg';
import ProfileIcon from '../../assets/images/icons/ic_profile_grey.svg';
import SurveyIcon from '../../assets/images/icons/ic_survey_grey.svg';

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
        component={HomeMenu}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon width={size} height={size} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Diary"
        component={
          isFirstRun.persistent.diaryIntroduction
            ? DiaryIntroduction
            : DiaryMenu
        }
        options={{
          tabBarLabel: 'Diário',
          tabBarVisible: !isFirstRun.persistent.diaryIntroduction,
          tabBarIcon: ({ color, size }) => {
            return (
              // <Image
              //   source={diaryIcon}
              //   height={size}
              //   width={size}
              //   style={{ tintColor: color }}
              // />
              <DiaryIcon height={size} width={size} fill={color} />
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
              // <Image
              //   source={surveyIcon}
              //   height={size}
              //   width={size}
              //   style={{ tintColor: color }}
              // />
              <SurveyIcon height={size} width={size} fill={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileMenu}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => {
            return (
              // <Image
              //   source={profileIcon}
              //   height={size}
              //   width={size}
              //   style={{ tintColor: color }}
              // />
              <ProfileIcon height={size} width={size} fill={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
