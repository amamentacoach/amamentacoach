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

const SurveyHelp: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();

  // Marca o formulário como enviado no dia.
  async function setFormSent(): Promise<void> {
    await createTelemetryAction({
      action: Action.Pressed,
      context: { screen: AppScreen.SurveyHelp, target: 'Actions.End' },
    });
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiarySurveyHelpLastDate',
      new Date().toISOString(),
    );
  }

  async function onFormEnd(): Promise<void> {
    await setFormSent();
    navigation.navigate('Survey');
  }

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.SurveyHelp },
    });
  }, []);

  return (
    <Survey
      title={i18n.t('SurveyTitles.SurveyHelp')}
      color={theme.babyBlue}
      category={9}
      Page={createGenericSurveyPage(onFormEnd)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default SurveyHelp;
