import React from 'react';

import NewPassword from '../../pages/Profile/NewPassword';

const CreateProfileRoutes = (Stack: any) => {
  return [
    <Stack.Screen
      key="NewPassword"
      name="NewPassword"
      component={NewPassword}
      options={{ title: 'Alterar senha' }}
    />,
  ];
};

export default CreateProfileRoutes;
