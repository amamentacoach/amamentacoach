import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import createGenericSurveyPage from '../../../components/GenericSurveyPage';
import Survey from '../../../components/Survey';
import theme from '../../../config/theme';

const SurveyBreastfeed: React.FC = () => {
  const navigation = useNavigation();

  // Marca o formulário como enviado no dia.
  async function setFormSent() {
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiarySurveyBreastfeedLastDate',
      new Date().toISOString(),
    );
  }

  async function onFormEnd() {
    await setFormSent();
    navigation.navigate('SurveyStatistics');
  }

  return (
    <Survey
      title="Amamentar um prematuro"
      color={theme.babyBlue}
      category={1}
      Page={createGenericSurveyPage(onFormEnd)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default SurveyBreastfeed;
