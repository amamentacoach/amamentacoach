import React from 'react';

import LeaveResearch from '../../pages/Profile/LeaveResearch';
import MenuTermsOfService from '../../pages/Profile/MenuTermsOfService';
import NewPassword from '../../pages/Profile/NewPassword';
import ReadTermsOfService from '../../pages/Profile/ReadTermsOfService';

const CreateProfileRoutes = (Stack: any) => {
  return [
    <Stack.Screen
      key="NewPassword"
      name="NewPassword"
      component={NewPassword}
      options={{ title: 'Alterar senha' }}
    />,
    <Stack.Screen
      key="MenuTermsOfService"
      name="MenuTermsOfService"
      component={MenuTermsOfService}
      options={{ title: 'Termo de Consentimento' }}
    />,
    <Stack.Screen
      key="ReadTermsOfService"
      name="ReadTermsOfService"
      component={ReadTermsOfService}
      options={{ title: 'Termo de Consentimento' }}
    />,
    <Stack.Screen
      key="LeaveResearch"
      name="LeaveResearch"
      component={LeaveResearch}
      options={{ title: 'Descadastrar da pesquisa' }}
    />,
  ];
};

export default CreateProfileRoutes;
