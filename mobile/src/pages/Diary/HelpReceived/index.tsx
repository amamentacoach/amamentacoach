import React from 'react';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/pt-br';

import AsyncStorage from '@react-native-community/async-storage';
import DiaryForm from '../../../components/DiaryForm';
import createGenericDiaryFormPage from '../../../components/GenericDiaryFormPage';

const HelpReceived: React.FC = () => {
  const navigation = useNavigation();

  // Marca o formulário como enviado no dia.
  async function setFormSent() {
    await AsyncStorage.setItem(
      '@AmamentaCoach:DiaryHelpReceivedLastDate',
      moment().format('YYYY-MM-DD'),
    );
  }

  async function onFormEnd() {
    await setFormSent();
    navigation.navigate('Diary');
  }

  return (
    <DiaryForm
      title="Minha rede de apoio"
      category={4}
      Page={createGenericDiaryFormPage(onFormEnd)}
      onFeedbackAccepted={setFormSent}
    />
  );
};

export default HelpReceived;
