import React from 'react';

import purpleHeader from '../config/purpleHeader';

import DiaryBreastfeed from '../../pages/Diary/DiaryBreastfeed';
import DiaryRegistry from '../../pages/Diary/DiaryRegistry';
import Feelings from '../../pages/Diary/Feelings';
import Goals from '../../pages/Diary/Goals';
import HelpReceived from '../../pages/Diary/HelpReceived';
import NewBreastfeedEntry from '../../pages/Diary/NewBreastfeedEntry';
import NewDiaryRegistry from '../../pages/Diary/NewDiaryRegistry';
import Report from '../../pages/Diary/Report';

const CreateDiaryRoutes = (Stack: any) => {
  return [
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
      options={{ title: 'Diário', ...purpleHeader }}
    />,
    <Stack.Screen
      key="Goals"
      name="Goals"
      component={Goals}
      options={{ title: 'Diário', ...purpleHeader }}
    />,
    <Stack.Screen
      key="HelpReceived"
      name="HelpReceived"
      component={HelpReceived}
      options={{ title: 'Diário', ...purpleHeader }}
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
      options={{ title: 'Relatório' }}
    />,
  ];
};

export default CreateDiaryRoutes;
