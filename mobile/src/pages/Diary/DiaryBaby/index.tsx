import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import theme from '../../../config/theme';
import DiaryForm from '../../../components/DiaryForm';
import createGenericDiaryFormPage from '../../../components/GenericDiaryFormPage';

const DiaryBaby: React.FC = () => {
  const navigation = useNavigation();

  // Marca o formulário como enviado no dia.
  async function setFormSent() {
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiaryDiaryBabyLastDate',
      new Date().toISOString(),
    );
  }

  async function onFormEnd() {
    await setFormSent();
    navigation.navigate('Diary');
  }

  return (
    <DiaryForm
      title="Meu Bebê Hoje"
      color={theme.babyPurple}
      category={10}
      Page={createGenericDiaryFormPage(theme.babyPurple, onFormEnd)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default DiaryBaby;
