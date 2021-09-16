import { Action, AppScreen } from '@common/Telemetria';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
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

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.SurveyFather },
    });
  }, []);

  // Marca o formulário como enviado no dia.
  async function setFormSent() {
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiarySurveyFatherLastDate',
      new Date().toISOString(),
    );
  }

  async function onFormEnd() {
    await setFormSent();
    navigation.navigate('Survey');
  }

  return (
    <Survey
      title="Participação do Pai"
      color={theme.babyBlue}
      category={5}
      Page={createGenericSurveyPage(onFormEnd, images)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default SurveyFather;
