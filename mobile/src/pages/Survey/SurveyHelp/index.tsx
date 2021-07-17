import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import createGenericSurveyPage from '../../../components/GenericSurveyPage';
import Survey from '../../../components/Survey';
import theme from '../../../config/theme';

const SurveyHelp: React.FC = () => {
  const navigation = useNavigation();

  // Marca o formulário como enviado no dia.
  async function setFormSent() {
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiarySurveyHelpLastDate',
      new Date().toISOString(),
    );
  }

  async function onFormEnd() {
    await setFormSent();
    navigation.navigate('Survey');
  }

  return (
    <Survey
      title="Sobre ajuda"
      color={theme.babyBlue}
      category={9}
      Page={createGenericSurveyPage(onFormEnd)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default SurveyHelp;
