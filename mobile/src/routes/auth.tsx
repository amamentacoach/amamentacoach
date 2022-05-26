import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import i18n from 'i18n-js';

import { useIsFirstRun } from 'contexts/firstRun';
import AcceptTermsOfService from 'pages/Auth/AcceptTermsOfService';
import BabyForm from 'pages/Auth/BabyForm';
import ForgotPassword from 'pages/Auth/ForgotPassword';
import Introduction from 'pages/Auth/Introduction';
import Login from 'pages/Auth/Login';
import MotherForm from 'pages/Auth/MotherForm';
import SignUp from 'pages/Auth/SignUp';

import type { RouteProp } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { BabySignUpInfo, MotherSignUpInfo } from 'services/signUp';

type AuthMotherInfo = Omit<
  MotherSignUpInfo,
  'birthday' | 'possibleBirthDate' | 'birthDate'
> & {
  birthday: string;
  possibleBirthDate: string | null;
  birthDate: string | null;
};

type AuthStackParamList = {
  BabyForm: {
    motherInfo: AuthMotherInfo;
  };
  MotherForm: {
    email: string;
    password: string;
  };
  DiaryBreastfeed: {
    date: string;
  };
  AcceptTermsOfService: {
    motherInfo: AuthMotherInfo;
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
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      {isFirstRun.persistent.appIntroduction && (
        <Stack.Screen
          component={Introduction}
          name="Introduction"
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        component={Login}
        name="Login"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ForgotPassword}
        name="ForgotPassword"
        options={{ title: i18n.t('LoginPage.ForgotPassword') }}
      />
      <Stack.Screen
        component={SignUp}
        name="SignUp"
        options={{ title: i18n.t('SignUp') }}
      />
      <Stack.Screen
        component={MotherForm}
        name="MotherForm"
        options={{ title: i18n.t('SignUp') }}
      />
      <Stack.Screen
        component={BabyForm}
        name="BabyForm"
        options={{ title: i18n.t('SignUp') }}
      />
      <Stack.Screen
        component={AcceptTermsOfService}
        name="AcceptTermsOfService"
        options={{ title: i18n.t('SignUp') }}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
