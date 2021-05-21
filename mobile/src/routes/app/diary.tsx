import React from 'react';

import createColorHeader from '../config/colorHeader';
import theme from '../../config/theme';

import DiaryBaby from '../../pages/Diary/DiaryBaby';
import DiaryBreastfeed from '../../pages/Diary/DiaryBreastfeed';
import DiaryRegistry from '../../pages/Diary/DiaryRegistry';
import Feelings from '../../pages/Diary/Feelings';
import Goals from '../../pages/Diary/Goals';
import HelpReceived from '../../pages/Diary/HelpReceived';
import NewBreastfeedEntry from '../../pages/Diary/NewBreastfeedEntry';
import NewDiaryRegistry from '../../pages/Diary/NewDiaryRegistry';
import Report from '../../pages/Diary/Report';

const CreateDiaryRoutes = (Stack: any) => {
  const headerBabyPurple = createColorHeader(theme.babyPurple);

  return [
    <Stack.Screen
      key="DiaryBaby"
      name="DiaryBaby"
      component={DiaryBaby}
      options={{ title: 'Enquete', ...headerBabyPurple }}
    />,
    <Stack.Screen
      key="DiaryBreastfeed"
      name="DiaryBreastfeed"
      component={DiaryBreastfeed}
      options={{ title: 'Amamentação' }}
    />,
    <Stack.Screen
      key="DiaryRegistry"
      name="DiaryRegistry"
      component={DiaryRegistry}
      options={{ title: 'Retirada de Leite' }}
    />,
    <Stack.Screen
      key="Feelings"
      name="Feelings"
      component={Feelings}
      options={{ title: 'Diário', ...headerBabyPurple }}
    />,
    <Stack.Screen
      key="Goals"
      name="Goals"
      component={Goals}
      options={{ title: 'Diário', ...headerBabyPurple }}
    />,
    <Stack.Screen
      key="HelpReceived"
      name="HelpReceived"
      component={HelpReceived}
      options={{ title: 'Diário', ...headerBabyPurple }}
    />,
    <Stack.Screen
      key="NewBreastfeedEntry"
      name="NewBreastfeedEntry"
      component={NewBreastfeedEntry}
      options={{ title: 'Registrar Amamentação' }}
    />,
    <Stack.Screen
      key="NewDiaryRegistry"
      name="NewDiaryRegistry"
      component={NewDiaryRegistry}
      options={{ title: 'Registrar Retirada de Leite' }}
    />,
    <Stack.Screen
      key="Report"
      name="Report"
      component={Report}
      options={{ title: 'Meu Desempenho' }}
    />,
  ];
};

export default CreateDiaryRoutes;
