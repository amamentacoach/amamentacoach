import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import i18n from 'i18n-js';

import theme from 'config/theme';
import { useIsFirstRun } from 'contexts/firstRun';
import DiaryIntroduction from 'pages/Diary/DiaryIntroduction';
import DiaryMenu from 'pages/Diary/Menu';
import HomeMenu from 'pages/Home/Menu';
import ProfileMenu from 'pages/Profile/Menu';
import SurveyMenu from 'pages/Survey/Menu';
import VideosMenu from 'pages/Videos/Menu';

import DiaryIcon from '@assets/images/icons/ic_diary_grey.svg';
import HomeIcon from '@assets/images/icons/ic_home_grey.svg';
import ProfileIcon from '@assets/images/icons/ic_profile_grey.svg';
import SurveyIcon from '@assets/images/icons/ic_survey_grey.svg';
import VideoIcon from '@assets/images/icons/video.svg';

const TabNavigator: React.FC = () => {
  const { isFirstRun } = useIsFirstRun();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.grey,
      }}>
      <Tab.Screen
        component={HomeMenu}
        name="Home"
        options={{
          tabBarLabel: i18n.t('Begin'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <HomeIcon fill={color} height={size} width={size} />
          ),
        }}
      />
      <Tab.Screen
        component={
          isFirstRun.persistent.diaryIntroduction
            ? DiaryIntroduction
            : DiaryMenu
        }
        name="Diary"
        options={{
          tabBarLabel: i18n.t('Diary'),
          headerShown: false,
          tabBarStyle: {
            display: isFirstRun.persistent.diaryIntroduction ? 'none' : 'flex',
          },
          tabBarIcon: ({ color, size }) => (
            <DiaryIcon fill={color} height={size} width={size} />
          ),
        }}
      />
      <Tab.Screen
        component={SurveyMenu}
        name="Survey"
        options={{
          tabBarLabel: i18n.t('Survey', { count: 2 }),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <SurveyIcon fill={color} height={size} width={size} />
          ),
        }}
      />
      <Tab.Screen
        component={VideosMenu}
        name="Videos"
        options={{
          tabBarLabel: i18n.t('Video', { count: 2 }),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <VideoIcon fill={color} height={size} width={size} />
          ),
        }}
      />
      <Tab.Screen
        component={ProfileMenu}
        name="ProfileMenu"
        options={{
          tabBarLabel: i18n.t('Profile'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon fill={color} height={size} width={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
