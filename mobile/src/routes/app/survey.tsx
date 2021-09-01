import React from 'react';

import i18n from 'i18n-js';

import theme from '../../config/theme';
import SurveyBreastfeed from '../../pages/Survey/SurveyBreastfeed';
import SurveyFather from '../../pages/Survey/SurveyFather';
import SurveyHelp from '../../pages/Survey/SurveyHelp';
import SurveyMotivation from '../../pages/Survey/SurveyMotivation';
import SurveyStatistics from '../../pages/Survey/SurveyStatistics';
import createColorHeader from '../config/colorHeader';

const CreateSurveyRoutes = (Stack: any) => {
  const headerBabyBlue = createColorHeader(theme.babyBlue);

  return [
    <Stack.Screen
      key="SurveyBreastfeed"
      name="SurveyBreastfeed"
      component={SurveyBreastfeed}
      options={{ title: i18n.t('Survey'), ...headerBabyBlue }}
    />,
    <Stack.Screen
      key="SurveyFather"
      name="SurveyFather"
      component={SurveyFather}
      options={{ title: i18n.t('Survey'), ...headerBabyBlue }}
    />,
    <Stack.Screen
      key="SurveyHelp"
      name="SurveyHelp"
      component={SurveyHelp}
      options={{ title: i18n.t('Survey'), ...headerBabyBlue }}
    />,
    <Stack.Screen
      key="SurveyMotivation"
      name="SurveyMotivation"
      component={SurveyMotivation}
      options={{ title: i18n.t('Survey'), ...headerBabyBlue }}
    />,
    <Stack.Screen
      key="SurveyStatistics"
      name="SurveyStatistics"
      component={SurveyStatistics}
      options={{ title: i18n.t('Survey'), ...headerBabyBlue }}
    />,
  ];
};

export default CreateSurveyRoutes;
