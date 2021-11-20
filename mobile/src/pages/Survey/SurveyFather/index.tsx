import { Action, AppScreen } from '@common/Telemetria';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';
import { useEffect } from 'react';

import createGenericSurveyPage from 'components/GenericSurveyPage';
import Survey from 'components/Survey';
import theme from 'config/theme';
import { createTelemetryAction } from 'utils/telemetryAction';

import type { RootStackProps } from 'routes/app';

import Father from '@assets/images/dad.png';

const SurveyFather: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();
  const images = [Father];

  // Marca o formulário como enviado no dia.
  async function setFormSent(): Promise<void> {
    await createTelemetryAction({
      action: Action.Pressed,
      context: { screen: AppScreen.SurveyFather, target: 'Actions.End' },
    });
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiarySurveyFatherLastDate',
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
      context: { screen: AppScreen.SurveyFather },
    });
  }, []);

  return (
    <Survey
      title={i18n.t('SurveyTitles.SurveyFather')}
      color={theme.babyBlue}
      category={5}
      Page={createGenericSurveyPage(onFormEnd, images)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default SurveyFather;
