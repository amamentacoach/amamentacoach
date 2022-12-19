import i18n from 'i18n-js';

import LeaveResearch from 'pages/Profile/LeaveResearch';
import MenuTermsOfService from 'pages/Profile/MenuTermsOfService';
import NewPassword from 'pages/Profile/NewPassword';
import ReadTermsOfService from 'pages/Profile/ReadTermsOfService';

import type { StackScreens } from 'routes/config/getNavigatorType';

const CreateProfileRoutes = (Stack: StackScreens): JSX.Element[] => {
  return [
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
