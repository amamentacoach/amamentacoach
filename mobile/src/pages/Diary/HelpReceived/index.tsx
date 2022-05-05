import { Action, AppScreen } from '@common/telemetria';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import createGenericSurveyPage from 'components/GenericSurveyPage';
import Survey from 'components/Survey';
import theme from 'config/theme';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootStackProps } from 'routes/app';

import HelpReceived1 from '@assets/images/help_received_1.png';
import HelpReceived2 from '@assets/images/help_received_2.png';

const HelpReceived: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const images = [HelpReceived1, HelpReceived2];

  // Marca o formulário como enviado no dia.
  async function setFormSent(): Promise<void> {
    createTelemetryAction({
      action: Action.Pressed,
      context: { screen: AppScreen.HelpReceived, target: 'Actions.End' },
    });
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiaryHelpReceivedLastDate',
      new Date().toISOString(),
    );
  }

  async function onFormEnd(): Promise<void> {
    await setFormSent();
    navigation.navigate('Diary');
  }

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.HelpReceived },
    });
  }, []);

  return (
    <Survey
      Page={createGenericSurveyPage(onFormEnd, images)}
      category={4}
      color={theme.babyPurple}
      title={i18n.t('SurveyTitles.HelpReceived')}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default HelpReceived;
