import i18n from 'i18n-js';

import LeaveResearch from 'pages/Profile/LeaveResearch';
import MenuTermsOfService from 'pages/Profile/MenuTermsOfService';
import NewPassword from 'pages/Profile/NewPassword';
import ReadTermsOfService from 'pages/Profile/ReadTermsOfService';

import type { StackScreens } from 'routes/config/getNavigatorType';

const CreateProfileRoutes = (Stack: StackScreens) => {
  return [
    <Stack.Screen
      key="NewPassword"
      name="NewPassword"
      component={NewPassword}
      options={{ title: i18n.t('ProfileMenuPage.ChangePassword') }}
    />,
    <Stack.Screen
      key="MenuTermsOfService"
      name="MenuTermsOfService"
      component={MenuTermsOfService}
      options={{ title: i18n.t('TermsOfService') }}
    />,
    <Stack.Screen
      key="ReadTermsOfService"
      name="ReadTermsOfService"
      component={ReadTermsOfService}
      options={{ title: i18n.t('TermsOfService') }}
    />,
    <Stack.Screen
      key="LeaveResearch"
      name="LeaveResearch"
      component={LeaveResearch}
      options={{ title: i18n.t('LeaveResearchPage.Text') }}
    />,
  ];
};

export default CreateProfileRoutes;
