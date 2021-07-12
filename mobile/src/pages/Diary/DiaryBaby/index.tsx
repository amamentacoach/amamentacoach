import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import theme from '../../../config/theme';
import RemoteForm from '../../../components/RemoteForm';
import createGenericRemoteFormPage from '../../../components/GenericRemoteFormPage';

const DiaryBaby: React.FC = () => {
  const navigation = useNavigation();

  // Marca o formulário como enviado no dia.
  async function setFormSent() {
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiaryBabyLastDate',
      new Date().toISOString(),
    );
  }

  async function onFormEnd() {
    await setFormSent();
    navigation.navigate('Diary');
  }

  return (
    <RemoteForm
      title="Meu Bebê Hoje"
      color={theme.babyPurple}
      category={10}
      Page={createGenericRemoteFormPage(onFormEnd)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default DiaryBaby;
