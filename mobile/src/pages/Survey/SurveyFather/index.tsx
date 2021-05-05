import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import theme from '../../../config/theme';
import DiaryForm from '../../../components/DiaryForm';
import createGenericDiaryFormPage from '../../../components/GenericDiaryFormPage';

import Father from '../../../../assets/images/dad.svg';

const SurveyFather: React.FC = () => {
  const navigation = useNavigation();

  const images = [Father];

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
    <DiaryForm
      title="Participação do Pai"
      color={theme.babyBlue}
      category={5}
      Page={createGenericDiaryFormPage(theme.babyBlue, onFormEnd, images)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default SurveyFather;
