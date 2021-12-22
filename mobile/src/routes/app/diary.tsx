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
      component={DiaryActions}
      key="DiaryActions"
      name="DiaryActions"
      options={{ title: i18n.t('Survey', { count: 1 }), ...headerBabyPurple }}
    />,
    <Stack.Screen
      component={DiaryBaby}
      key="DiaryBaby"
      name="DiaryBaby"
      options={{ title: i18n.t('Survey', { count: 1 }), ...headerBabyPurple }}
    />,
    <Stack.Screen
      component={DiaryBreastfeed}
      key="DiaryBreastfeed"
      name="DiaryBreastfeed"
      options={{ title: i18n.t('Diary') }}
    />,
    <Stack.Screen
      component={DiaryRegistry}
      key="DiaryRegistry"
      name="DiaryRegistry"
      options={{ title: i18n.t('Diary') }}
    />,
    <Stack.Screen
      component={Feelings}
      key="Feelings"
      name="Feelings"
      options={{ title: i18n.t('Diary'), ...headerBabyPurple }}
    />,
    <Stack.Screen
      component={Goals}
      key="Goals"
      name="Goals"
      options={{ title: i18n.t('Diary'), ...headerBabyPurple }}
    />,
    <Stack.Screen
      component={HelpReceived}
      key="HelpReceived"
      name="HelpReceived"
      options={{ title: i18n.t('Diary'), ...headerBabyPurple }}
    />,
    <Stack.Screen
      component={NewBreastfeedEntry}
      key="NewBreastfeedEntry"
      name="NewBreastfeedEntry"
      options={{ title: i18n.t('Diary') }}
    />,
    <Stack.Screen
      component={NewDiaryRegistry}
      key="NewDiaryRegistry"
      name="NewDiaryRegistry"
      options={{ title: i18n.t('Diary') }}
    />,
    <Stack.Screen
      component={Report}
      key="Report"
      name="Report"
      options={{ title: i18n.t('DiaryMenuPage.Option8') }}
    />,
  ];
};

export default CreateDiaryRoutes;
