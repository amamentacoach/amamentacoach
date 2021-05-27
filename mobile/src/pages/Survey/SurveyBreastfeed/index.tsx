import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import theme from '../../../config/theme';
import RemoteForm from '../../../components/RemoteForm';
import createGenericRemoteFormPage from '../../../components/GenericRemoteFormPage';

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
    <RemoteForm
      title="Amamentar um prematuro"
      color={theme.babyBlue}
      category={1}
      Page={createGenericRemoteFormPage(onFormEnd)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default SurveyBreastfeed;
