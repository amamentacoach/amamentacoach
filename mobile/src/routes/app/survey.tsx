import i18n from 'i18n-js';

import theme from 'config/theme';
import SurveyBreastfeed from 'pages/Survey/SurveyBreastfeed';
import SurveyFather from 'pages/Survey/SurveyFather';
import SurveyHelp from 'pages/Survey/SurveyHelp';
import SurveyMotivation from 'pages/Survey/SurveyMotivation';
import SurveyStatistics from 'pages/Survey/SurveyStatistics';
import createColorHeader from 'routes/config/colorHeader';

import type { StackScreens } from 'routes/config/getNavigatorType';

const CreateSurveyRoutes = (Stack: StackScreens): JSX.Element[] => {
  const headerBabyBlue = createColorHeader(theme.babyBlue);

  return [
    <Stack.Screen
      component={SurveyBreastfeed}
      key="SurveyBreastfeed"
      name="SurveyBreastfeed"
      options={{ title: i18n.t('Survey', { count: 1 }), ...headerBabyBlue }}
    />,
    <Stack.Screen
      component={SurveyFather}
      key="SurveyFather"
      name="SurveyFather"
      options={{ title: i18n.t('Survey', { count: 1 }), ...headerBabyBlue }}
    />,
    <Stack.Screen
      component={SurveyHelp}
      key="SurveyHelp"
      name="SurveyHelp"
      options={{ title: i18n.t('Survey', { count: 1 }), ...headerBabyBlue }}
    />,
    <Stack.Screen
      component={SurveyMotivation}
      key="SurveyMotivation"
      name="SurveyMotivation"
      options={{ title: i18n.t('Survey', { count: 1 }), ...headerBabyBlue }}
    />,
    <Stack.Screen
      component={SurveyStatistics}
      key="SurveyStatistics"
      name="SurveyStatistics"
      options={{ title: i18n.t('Survey', { count: 1 }), ...headerBabyBlue }}
    />,
  ];
};

export default CreateSurveyRoutes;
