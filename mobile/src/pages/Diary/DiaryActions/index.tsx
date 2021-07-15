import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import theme from '../../../config/theme';
import Survey from '../../../components/Survey';
import createGenericSurveyPage from '../../../components/GenericSurveyPage';

const DiaryActions: React.FC = () => {
  const navigation = useNavigation();

  // Marca o formulário como enviado no dia.
  async function setFormSent() {
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiaryActionsLastDate',
      new Date().toISOString(),
    );
  }

  async function onFormEnd() {
    await setFormSent();
    navigation.navigate('Diary');
  }

  return (
    <Survey
      title="Ações Realizadas com o bebê"
      color={theme.babyPurple}
      category={6}
      Page={createGenericSurveyPage(onFormEnd)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default DiaryActions;
