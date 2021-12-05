import i18n from 'i18n-js';

import theme from 'config/theme';
import DiaryActions from 'pages/Diary/DiaryActions';
import DiaryBaby from 'pages/Diary/DiaryBaby';
import DiaryBreastfeed from 'pages/Diary/DiaryBreastfeed';
import DiaryRegistry from 'pages/Diary/DiaryRegistry';
import Feelings from 'pages/Diary/Feelings';
import Goals from 'pages/Diary/Goals';
import HelpReceived from 'pages/Diary/HelpReceived';
import NewBreastfeedEntry from 'pages/Diary/NewBreastfeedEntry';
import NewDiaryRegistry from 'pages/Diary/NewDiaryRegistry';
import Report from 'pages/Diary/Report';
import createColorHeader from 'routes/config/colorHeader';

import type { StackScreens } from 'routes/config/getNavigatorType';

const CreateDiaryRoutes = (Stack: StackScreens): JSX.Element[] => {
  const headerBabyPurple = createColorHeader(theme.babyPurple);

  return [
    <Stack.Screen
      key="DiaryActions"
      name="DiaryActions"
      component={DiaryActions}
      options={{ title: i18n.t('Survey', { count: 1 }), ...headerBabyPurple }}
    />,
    <Stack.Screen
      key="DiaryBaby"
      name="DiaryBaby"
      component={DiaryBaby}
      options={{ title: i18n.t('Survey', { count: 1 }), ...headerBabyPurple }}
    />,
    <Stack.Screen
      key="DiaryBreastfeed"
      name="DiaryBreastfeed"
      component={DiaryBreastfeed}
      options={{ title: i18n.t('Diary') }}
    />,
    <Stack.Screen
      key="DiaryRegistry"
      name="DiaryRegistry"
      component={DiaryRegistry}
      options={{ title: i18n.t('Diary') }}
    />,
    <Stack.Screen
      key="Feelings"
      name="Feelings"
      component={Feelings}
      options={{ title: i18n.t('Diary'), ...headerBabyPurple }}
    />,
    <Stack.Screen
      key="Goals"
      name="Goals"
      component={Goals}
      options={{ title: i18n.t('Diary'), ...headerBabyPurple }}
    />,
    <Stack.Screen
      key="HelpReceived"
      name="HelpReceived"
      component={HelpReceived}
      options={{ title: i18n.t('Diary'), ...headerBabyPurple }}
    />,
    <Stack.Screen
      key="NewBreastfeedEntry"
      name="NewBreastfeedEntry"
      component={NewBreastfeedEntry}
      options={{ title: i18n.t('Diary') }}
    />,
    <Stack.Screen
      key="NewDiaryRegistry"
      name="NewDiaryRegistry"
      component={NewDiaryRegistry}
      options={{ title: i18n.t('Diary') }}
    />,
    <Stack.Screen
      key="Report"
      name="Report"
      component={Report}
      options={{ title: i18n.t('DiaryMenuPage.Option8') }}
    />,
  ];
};

export default CreateDiaryRoutes;
