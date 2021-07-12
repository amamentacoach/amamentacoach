import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import theme from '../../../config/theme';
import RemoteForm from '../../../components/RemoteForm';
import createGenericRemoteFormPage from '../../../components/GenericRemoteFormPage';

import HelpReceived1 from '../../../../assets/images/help_received_1.svg';
import HelpReceived2 from '../../../../assets/images/help_received_2.svg';

const HelpReceived: React.FC = () => {
  const navigation = useNavigation();

  const images = [HelpReceived1, HelpReceived2];

  // Marca o formulário como enviado no dia.
  async function setFormSent() {
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiaryHelpReceivedLastDate',
      new Date().toISOString(),
    );
  }

  async function onFormEnd() {
    await setFormSent();
    navigation.navigate('Diary');
  }

  return (
    <RemoteForm
      title="Minha rede de apoio"
      color={theme.babyPurple}
      category={4}
      Page={createGenericRemoteFormPage(onFormEnd, images)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default HelpReceived;
