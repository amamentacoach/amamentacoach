import React from 'react';

import purpleHeader from '../config/purpleHeader';

import SurveyBreastfeed from '../../pages/Survey/SurveyBreastfeed';
import SurveyFather from '../../pages/Survey/SurveyFather';
import SurveyStatistics from '../../pages/Survey/SurveyStatistics';

const createSurveyRoutes = (Stack: any) => {
  return [
    <Stack.Screen
      key="SurveyBreastfeed"
      name="SurveyBreastfeed"
      component={SurveyBreastfeed}
      options={{ title: 'Enquete', ...purpleHeader }}
    />,
    <Stack.Screen
      key="SurveyFather"
      name="SurveyFather"
      component={SurveyFather}
      options={{ title: 'Enquete', ...purpleHeader }}
    />,
    <Stack.Screen
      key="SurveyStatistics"
      name="SurveyStatistics"
      component={SurveyStatistics}
      options={{ title: 'Enquete', ...purpleHeader }}
    />,
  ];
};

export default createSurveyRoutes;
