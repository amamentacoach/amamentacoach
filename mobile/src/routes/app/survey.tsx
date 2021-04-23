import React from 'react';

import createColorHeader from '../config/colorHeader';
import theme from '../../config/theme';

import SurveyBaby from '../../pages/Survey/SurveyBaby';
import SurveyBreastfeed from '../../pages/Survey/SurveyBreastfeed';
import SurveyFather from '../../pages/Survey/SurveyFather';
import SurveyHelp from '../../pages/Survey/SurveyHelp';
import SurveyMotivation from '../../pages/Survey/SurveyMotivation';
import SurveyStatistics from '../../pages/Survey/SurveyStatistics';

const CreateSurveyRoutes = (Stack: any) => {
  const headerBabyBlue = createColorHeader(theme.babyBlue);

  return [
    <Stack.Screen
      key="SurveyBaby"
      name="SurveyBaby"
      component={SurveyBaby}
      options={{ title: 'Enquete', ...headerBabyBlue }}
    />,
    <Stack.Screen
      key="SurveyBreastfeed"
      name="SurveyBreastfeed"
      component={SurveyBreastfeed}
      options={{ title: 'Enquete', ...headerBabyBlue }}
    />,
    <Stack.Screen
      key="SurveyFather"
      name="SurveyFather"
      component={SurveyFather}
      options={{ title: 'Enquete', ...headerBabyBlue }}
    />,
    <Stack.Screen
      key="SurveyHelp"
      name="SurveyHelp"
      component={SurveyHelp}
      options={{ title: 'Enquete', ...headerBabyBlue }}
    />,
    <Stack.Screen
      key="SurveyMotivation"
      name="SurveyMotivation"
      component={SurveyMotivation}
      options={{ title: 'Enquete', ...headerBabyBlue }}
    />,
    <Stack.Screen
      key="SurveyStatistics"
      name="SurveyStatistics"
      component={SurveyStatistics}
      options={{ title: 'Enquete', ...headerBabyBlue }}
    />,
  ];
};

export default CreateSurveyRoutes;
