import i18n from 'i18n-js';

import { useAuth } from 'contexts/auth';
import LeaveResearch from 'pages/Profile/LeaveResearch';
import MenuTermsOfService from 'pages/Profile/MenuTermsOfService';
import MyBabies from 'pages/Profile/MyBabies';
import NewPassword from 'pages/Profile/NewPassword';
import Profile from 'pages/Profile/Profile';
import ReadTermsOfService from 'pages/Profile/ReadTermsOfService';

import type { StackScreens } from 'routes/config/getNavigatorType';

const CreateProfileRoutes = (Stack: StackScreens): JSX.Element[] => {
  const { userInfo } = useAuth();

  return [
    <Stack.Screen
      component={Profile}
      key="Profile"
      name="Profile"
      options={{ title: i18n.t('ProfileMenuPage.MyProfile') }}
    />,
    <Stack.Screen
      component={MyBabies}
      key="MyBabies"
      name="MyBabies"
      options={{
        title: i18n.t('ProfileMenuPage.MyBabies', {
          count: userInfo.babies.length,
        }),
      }}
    />,
    <Stack.Screen
      component={NewPassword}
      key="NewPassword"
      name="NewPassword"
      options={{ title: i18n.t('ProfileMenuPage.ChangePassword') }}
    />,
    <Stack.Screen
      component={MenuTermsOfService}
      key="MenuTermsOfService"
      name="MenuTermsOfService"
      options={{ title: i18n.t('TermsOfService') }}
    />,
    <Stack.Screen
      component={ReadTermsOfService}
      key="ReadTermsOfService"
      name="ReadTermsOfService"
      options={{ title: i18n.t('TermsOfService') }}
    />,
    <Stack.Screen
      component={LeaveResearch}
      key="LeaveResearch"
      name="LeaveResearch"
      options={{ title: i18n.t('LeaveResearchPage.Text') }}
    />,
  ];
};

export default CreateProfileRoutes;
