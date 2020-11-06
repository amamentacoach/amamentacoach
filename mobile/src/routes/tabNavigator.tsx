import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Diary from '../pages/Diary';
import Survey from '../pages/Survey';
import Profile from '../pages/Profile';
import HU from '../pages/HU';
import Premature from '../pages/Premature';
import StepByStepPremature from '../pages/StepByStepPremature';
import HowToBreastfeed from '../pages/HowToBreastfeed';
import EmotionsAndBreastfeeding from '../pages/EmotionsAndBreastfeeding';
import AdditionalInformation from '../pages/AdditionalInformation';
import NotWhatIExpected from '../pages/NotWhatIExpected';

import homeIcon from '../../assets/images/icons/ic_home_grey.png';
import diaryIcon from '../../assets/images/icons/ic_diary_grey.png';
import surveyIcon from '../../assets/images/icons/ic_survey_grey.png';
import profileIcon from '../../assets/images/icons/ic_profile_grey.png';

const HomeRoutes: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HU"
        component={HU}
        options={{ title: 'Sinta-se em casa!' }}
      />
      <Stack.Screen
        name="Premature"
        component={Premature}
        options={{ title: 'O Prematuro' }}
      />
      <Stack.Screen
        name="StepByStepPremature"
        component={StepByStepPremature}
        options={{ title: 'Infográfico' }}
      />
      <Stack.Screen
        name="HowToBreastfeed"
        component={HowToBreastfeed}
        options={{ title: 'Retirada do leite' }}
      />
      <Stack.Screen
        name="EmotionsAndBreastfeeding"
        component={EmotionsAndBreastfeeding}
        options={{ title: 'Emoções e amamentação' }}
      />
      <Stack.Screen
        name="AdditionalInformation"
        component={AdditionalInformation}
        options={{ title: 'Mais informações' }}
      />
      <Stack.Screen
        name="NotWhatIExpected"
        component={NotWhatIExpected}
        options={{
          title: 'O Prematuro',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#7D5CD7',
            elevation: 0, // Remove a sombra no Android
            shadowOpacity: 0, // Remove a sombra no iOS
          },
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator: React.FC = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#7D5CD7',
        inactiveTintColor: '#545454',
        style: {
          paddingBottom: 6,
          paddingTop: 6,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeRoutes}
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

export default TabNavigator;
