import { createStackNavigator } from '@react-navigation/stack';
import i18n from 'i18n-js';

import { useIsFirstRun } from '../contexts/firstRun';
import AcceptTermsOfService from '../pages/Auth/AcceptTermsOfService';
import BabyForm from '../pages/Auth/BabyForm';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Introduction from '../pages/Auth/Introduction';
import Login from '../pages/Auth/Login';
import MotherForm from '../pages/Auth/MotherForm';
import SignUp from '../pages/Auth/SignUp';

import type { BabySignUpInfo, MotherSignUpInfo } from '../services/auth';
import type { RouteProp } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';

type AuthStackParamList = {
  BabyForm: {
    motherInfo: MotherSignUpInfo;
  };
  MotherForm: {
    email: string;
    password: string;
  };
  DiaryBreastfeed: {
    date: string;
  };
  AcceptTermsOfService: {
    motherInfo: MotherSignUpInfo;
    babiesInfo: BabySignUpInfo[];
  };
  Login: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
};

export type AuthStackProps = StackNavigationProp<AuthStackParamList>;

export type AuthRouteProp<RouteName extends keyof AuthStackParamList> =
  RouteProp<AuthStackParamList, RouteName>;

const AuthRoutes: React.FC = () => {
  const Stack = createStackNavigator();
  const { isFirstRun } = useIsFirstRun();

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      {isFirstRun.persistent.appIntroduction && (
        <Stack.Screen
          name="Introduction"
          component={Introduction}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ title: i18n.t('LoginPage.ForgotPassword') }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: i18n.t('SignUp') }}
      />
      <Stack.Screen
        name="MotherForm"
        component={MotherForm}
        options={{ title: i18n.t('SignUp') }}
      />
      <Stack.Screen
        name="BabyForm"
        component={BabyForm}
        options={{ title: i18n.t('SignUp') }}
      />
      <Stack.Screen
        name="AcceptTermsOfService"
        component={AcceptTermsOfService}
        options={{ title: i18n.t('SignUp') }}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
