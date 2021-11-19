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

const DiaryActions: React.FC = () => {
  const navigation = useNavigation<RootStackProps>();

  // Marca o formulário como enviado no dia.
  async function setFormSent() {
    await createTelemetryAction({
      action: Action.Pressed,
      context: { screen: AppScreen.DiaryActions, target: 'Actions.End' },
    });
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiaryActionsLastDate',
      new Date().toISOString(),
    );
  }

  async function onFormEnd() {
    await setFormSent();
    navigation.navigate('Diary');
  }

  useEffect(() => {
    createTelemetryAction({
      action: Action.Opened,
      context: { screen: AppScreen.DiaryActions },
    });
  }, []);

  return (
    <Survey
      title={i18n.t('SurveyTitles.DiaryActions')}
      color={theme.babyPurple}
      category={6}
      Page={createGenericSurveyPage(onFormEnd)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default DiaryActions;
